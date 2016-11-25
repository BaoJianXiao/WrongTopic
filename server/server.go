package main

import (
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	"com.shuwen.study/middleware"
	"com.shuwen.study/router"
	"github.com/gin-gonic/gin"
	mgo "gopkg.in/mgo.v2"
)

var mgoSession *mgo.Session

func main() {
	router := router.NewRouters(getSession())
	r := gin.Default()
	r.Static("/assets", "assets")
	r.StaticFile("/", "assets/index.html")
	r.Use(middleware.Bind())
	r.PUT("/listForType", router.GetListForType)
	r.PUT("/listForQuery", router.GetListForQuery)
	r.PUT("/getLogQuestion", router.ReadLogQuestion)
	r.PUT("/createLogQuestion", router.CreateLog)
	r.PUT("/logs", router.Logs)
	r.PUT("/create", router.Create)
	r.Run(":3002")
}
func getCurrentDirectory() string {
	dir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		log.Fatal(err)
	}
	return strings.Replace(dir, "\\", "/", -1)
}

/**
公共方法，获取session，如果存在则拷贝一份
*/
func getSession() *mgo.Session {
	if mgoSession == nil {
		var err error
		dialInfo := &mgo.DialInfo{
			Addrs:     []string{"192.168.31.203"},
			Direct:    false,
			Timeout:   time.Second * 1,
			Database:  "study",
			Source:    "study",
			Username:  "study",
			Password:  "study",
			PoolLimit: 200,
		}
		mgoSession, err = mgo.DialWithInfo(dialInfo)
		if err != nil {
			panic(err)
		}
	}
	//最大连接池默认为4096
	mgoSession.SetPoolLimit(100)
	return mgoSession
}
