package db

import "gopkg.in/mgo.v2/bson"

type Question struct {
	ID        bson.ObjectId `bson:"_id"`
	Type      int           `bson:"type" json:"type"  binding:"required"`
	Grade     int           `bson:"grade" json:"grade"  binding:"required"`
	Level     int           `bson:"level" json:"level"`
	Q         string        `bson:"q" json:"q"`
	A         string        `bson:"a" json:"a"`
	Time      int           `bson:"time" json:"time"`
	Times     int           `bson:"times" json:"times"`
	Important int           `bson:"important" json:"important"`
	Remark    string        `bson:"remark" json:"remark"`
}

type Log struct {
	ID    bson.ObjectId `bson:"_id"`
	Type  int           `bson:"type"`
	Grade int           `bson:"grade"`
	Level int           `bson:"level"`
	QS    string        `bson:"qs"`
	Score int           `bson:"score"`
	Time  int           `bson:"time"`
}
