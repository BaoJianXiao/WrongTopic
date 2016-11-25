package middleware

import (
	"bytes"
	"io"

	"github.com/gin-gonic/gin"
)

func Bind() gin.HandlerFunc {
	return func(c *gin.Context) {
		buffer := bytes.NewBuffer(make([]byte, 0, 65536))
		io.Copy(buffer, c.Request.Body)
		temp := buffer.Bytes()
		length := len(temp)
		var body []byte
		//are we wasting more than 10% space?
		if cap(temp) > (length + length/10) {
			body = make([]byte, length)
			copy(body, temp)
		} else {
			body = temp
		}
		c.Set("data", body)
		c.Next()
	}
}
