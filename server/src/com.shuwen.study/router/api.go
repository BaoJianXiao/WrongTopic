package router

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"com.shuwen.study/db"
	"com.shuwen.study/db/dao"
	"com.shuwen.study/util"
	"github.com/gin-gonic/gin"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type (
	Router struct {
		dao *dao.StudyDao
	}
)

func NewRouters(s *mgo.Session) *Router {
	dao := dao.NewStudyDao(s)
	return &Router{dao}
}

func (routers Router) GetListForQuery(c *gin.Context) {
	var query struct {
		Question db.Question
		Rand     bool `json:"rand" binding:"required"`
		Count    int  `json:"count" binding:"required"`
	}
	request := c.MustGet("data").([]byte)
	json.Unmarshal(request, &query)
	bs := bson.M{}
	if query.Question.Type != 0 {
		bs["type"] = query.Question.Type
	}
	if query.Question.Level != 0 {
		bs["level"] = query.Question.Level
	}
	if query.Question.Grade != 0 {
		bs["grade"] = query.Question.Grade
	}
	var list []interface{}
	var err string
	if query.Rand {
		list, err = routers.dao.GetListRand(bs, query.Count)
	} else {
		list, err = routers.dao.GetList(bs, 1, query.Count)
	}

	if err != "" {
		c.JSON(http.StatusOK, util.Fail(err))
		c.Abort()
		return
	}
	for i := 0; i < len(list); i++ {
		routers.dao.UpdateTimes(list[i].(bson.M))
	}
	c.JSON(http.StatusOK, util.Success(list))
}

func (routers Router) GetListForType(c *gin.Context) {
	var query struct {
		PageIndex int `json:"pageIndex" binding:"required"`
		PageSize  int `json:"pageSize" binding:"required"`
		Type      int `json:"type" binding:"required"`
	}
	request := c.MustGet("data").([]byte)
	json.Unmarshal(request, &query)
	list, err := routers.dao.GetListForType(query.Type, query.PageIndex, query.PageSize)
	if err != "" {
		c.JSON(http.StatusOK, util.Fail(err))
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, util.Success(list))
}

func (routers Router) Create(c *gin.Context) {
	var question db.Question
	request := c.MustGet("data").([]byte)
	json.Unmarshal(request, &question)
	_id, err := routers.dao.Insert(bson.M{
		"type":      question.Type,
		"grade":     question.Grade,
		"level":     question.Level,
		"q":         question.Q,
		"a":         question.A,
		"time":      time.Now().Unix(),
		"times":     question.Times,
		"important": question.Important,
		"remark":    question.Remark})
	if err != "" {
		c.JSON(http.StatusOK, util.Fail(err))
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, util.Success(_id))
}

func (routers Router) CreateLog(c *gin.Context) {
	var log db.Log
	request := c.MustGet("data").([]byte)
	json.Unmarshal(request, &log)
	_id, err := routers.dao.InsertLog(bson.M{
		"type":  log.Type,
		"grade": log.Grade,
		"level": log.Level,
		"qs":    log.QS,
		"score": log.Score,
		"time":  time.Now().Unix()})
	if err != "" {
		c.JSON(http.StatusOK, util.Fail(err))
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, util.Success(_id))
}

func (routers Router) Logs(c *gin.Context) {
	var query struct {
		PageIndex int `json:"pageIndex" binding:"required"`
		PageSize  int `json:"pageSize" binding:"required"`
	}
	request := c.MustGet("data").([]byte)
	json.Unmarshal(request, &query)
	list, err := routers.dao.GetLogList(query.PageIndex, query.PageSize)
	if err != "" {
		c.JSON(http.StatusOK, util.Fail(err))
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, util.Success(list))
}

func (routers Router) ReadLogQuestion(c *gin.Context) {
	var query struct {
		ID string `json:"id" binding:"required"`
	}
	request := c.MustGet("data").([]byte)
	json.Unmarshal(request, &query)
	log, err := routers.dao.GetLog(query.ID)
	if err != "" {
		c.JSON(http.StatusOK, util.Fail(err))
		c.Abort()
		return
	}
	if log["qs"] != "" {
		ids := strings.Split(log["qs"].(string), ",")
		list, e := routers.dao.GetListForLog(ids)
		if e != "" {
			c.JSON(http.StatusOK, util.Fail(e))
			c.Abort()
			return
		}
		c.JSON(http.StatusOK, util.Success(list))
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, util.Fail("无记录"))
}
