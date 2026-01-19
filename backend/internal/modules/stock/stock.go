package stock

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.RouterGroup, db *sql.DB) {
	r.GET("/stock", getStockHandler(db))
	r.POST("/stock/movements", createMovementHandler(db))
	r.GET("/stock/history", getHistoryHandler(db))
}

func getStockHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Get stock - TODO"})
	}
}

func createMovementHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Create movement - TODO"})
	}
}

func getHistoryHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Get history - TODO"})
	}
}
