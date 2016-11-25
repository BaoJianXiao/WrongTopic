package util

import "gopkg.in/mgo.v2/bson"

// Success 返回成功的信息
func Success(data interface{}) map[string]interface{} {
	r := make(map[string]interface{})
	r["success"] = true
	r["data"] = data
	return r
}

// Fail 返回失败的信息
func Fail(message string) map[string]interface{} {
	r := make(map[string]interface{})
	r["success"] = false
	r["fail"] = message
	return r
}

// Pick 从map中获取指定的数据字段
func Pick(keys []string, data bson.M) map[string]interface{} {
	r := make(map[string]interface{})
	for _, v := range keys {
		r[v] = data[v]
	}
	return r
}
