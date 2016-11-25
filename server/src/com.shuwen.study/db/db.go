package db

import (
	"math/rand"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type (
	DB struct {
		db *mgo.Session
	}
)

var dataBase = "study"

func NewDB(s *mgo.Session) *DB {
	return &DB{s}
}

//公共方法，获取collection对象
func (db DB) witchCollection(collection string, s func(*mgo.Collection) error) error {
	session := db.db.Clone()
	defer session.Close()
	c := session.DB(dataBase).C(collection)
	return s(c)
}

func (db DB) FindAll(collectionName string, sort string, query bson.M) (results []interface{}, err error) {
	exop := func(c *mgo.Collection) error {
		return c.Find(query).Sort(sort).All(&results)
	}
	err = db.witchCollection(collectionName, exop)
	return
}

func (db DB) FindRand(collectionName string, query bson.M, count int) (results []interface{}, err error) {
	exop := func(c *mgo.Collection) error {
		Q := c.Find(query)
		cnt, _ := Q.Count()
		var r error
		if cnt > count {
			list := []interface{}{}
			skip := rand.Intn(cnt)
			for {
				count--
				if count < 0 {
					break
				} else {
					skip = rand.Intn(cnt)
					r = Q.Limit(1).Skip(skip).All(&results)
					if len(results) > 0 {
						has := false
						for i := 0; i < len(list); i++ {
							if list[i].(bson.M)["_id"].(string) == results[0].(bson.M)["_id"].(string) {
								count++
								has = true
							}
						}
						if !has {
							list = append(list, results[0])
						}
					}
				}
			}
			results = list
		} else {
			r = Q.All(&results)
		}
		return r
	}
	err = db.witchCollection(collectionName, exop)
	return
}

/**
 * 执行查询，公共方法
 * [Search description]
 * @param {[type]} collectionName string [description]
 * @param {[type]} query          bson.M [description]
 * @param {[type]} sort           bson.M [description]
 * @param {[type]} fields         bson.M [description]
 * @param {[type]} skip           int    [description]
 * @param {[type]} limit          int)   (results      []interface{}, err error [description]
 */
func (db DB) SearchPageSplit(collectionName string, query bson.M, sort string, fields bson.M, skip int, limit int) (results []interface{}, err error) {
	exop := func(c *mgo.Collection) error {
		return c.Find(query).Sort(sort).Select(fields).Skip(skip).Limit(limit).All(&results)
	}
	err = db.witchCollection(collectionName, exop)
	return
}

func (db DB) Search(collectionName string, query bson.M, sort string, fields bson.M) (results []interface{}, err error) {
	exop := func(c *mgo.Collection) error {
		return c.Find(query).Sort(sort).Select(fields).All(&results)
	}
	err = db.witchCollection(collectionName, exop)
	return
}

func (db DB) FindOne(collectionName string, query bson.M) (results interface{}, err error) {
	exop := func(c *mgo.Collection) error {
		return c.Find(query).One(&results)
	}
	err = db.witchCollection(collectionName, exop)
	return
}

func (db DB) FindOneFields(collectionName string, query bson.M, fields bson.M) (results interface{}, err error) {
	exop := func(c *mgo.Collection) error {
		return c.Find(query).Select(fields).One(&results)
	}
	err = db.witchCollection(collectionName, exop)
	return
}

/**
 * Insert
 * 插入数据，公共方法
 */
func (db DB) Insert(collectionName string, data bson.M) (err error) {
	exop := func(c *mgo.Collection) error {
		return c.Insert(data)
	}
	err = db.witchCollection(collectionName, exop)
	return
}

func (db DB) Update(collectionName string, query bson.M, data bson.M) (err error) {
	exop := func(c *mgo.Collection) error {
		return c.Update(query, data)
	}
	err = db.witchCollection(collectionName, exop)
	return
}
