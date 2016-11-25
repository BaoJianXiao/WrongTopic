package dao

import (
	"com.shuwen.study/db"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type (
	StudyDao struct {
		db *db.DB
	}
)

func NewStudyDao(s *mgo.Session) *StudyDao {
	return &StudyDao{db.NewDB(s)}
}

func (dao StudyDao) GetListRand(query bson.M, count int) ([]interface{}, string) {
	result, err := dao.db.FindRand("question", query, count)
	if err != nil {
		return nil, err.Error()
	}
	return result, ""
}

func (dao StudyDao) GetListForType(t int, pageIndex int, pageSize int) ([]interface{}, string) {
	result, err := dao.db.SearchPageSplit("question", bson.M{"type": t}, "-_id", nil, (pageIndex-1)*pageSize, pageSize)
	if err != nil {
		return nil, err.Error()
	}
	return result, ""
}

func (dao StudyDao) GetLogList(pageIndex int, pageSize int) ([]interface{}, string) {
	result, err := dao.db.SearchPageSplit("log", bson.M{}, "-_id", nil, (pageIndex-1)*pageSize, pageSize)
	if err != nil {
		return nil, err.Error()
	}
	return result, ""
}

func (dao StudyDao) GetList(query bson.M, pageIndex int, pageSize int) ([]interface{}, string) {
	result, err := dao.db.SearchPageSplit("question", query, "-_id", nil, (pageIndex-1)*pageSize, pageSize)
	if err != nil {
		return nil, err.Error()
	}
	return result, ""
}

func (dao StudyDao) UpdateTimes(times bson.M) string {
	times["times"] = times["times"].(int) + 1
	err := dao.db.Update("question", bson.M{"_id": times["_id"]}, times)
	if err != nil {
		return err.Error()
	}
	return ""
}

func (dao StudyDao) GetListForLog(ids []string) ([]interface{}, string) {
	var query []interface{}
	for i := 0; i < len(ids); i++ {
		query = append(query, bson.M{"_id": ids[i]})
	}
	result, err := dao.db.FindAll("question", "_id", bson.M{"$or": query})
	if err != nil {
		return nil, err.Error()
	}
	return result, ""
}

func (dao StudyDao) GetLog(id string) (bson.M, string) {
	result, err := dao.db.FindOne("log", bson.M{"_id": id})
	if err != nil {
		return nil, err.Error()
	}
	return result.(bson.M), ""
}

func (dao StudyDao) Insert(data bson.M) (string, string) {
	var _id = bson.NewObjectId().Hex()
	data["_id"] = _id
	err := dao.db.Insert("question", data)
	if err != nil {
		return "", err.Error()
	}
	return _id, ""
}

func (dao StudyDao) InsertLog(data bson.M) (string, string) {
	var _id = bson.NewObjectId().Hex()
	data["_id"] = _id
	err := dao.db.Insert("log", data)
	if err != nil {
		return "", err.Error()
	}
	return _id, ""
}
