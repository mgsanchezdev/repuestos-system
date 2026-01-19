package pricing

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.RouterGroup, db *sql.DB) {
	r.GET("/prices", listPricesHandler(db))
	r.POST("/prices", createPriceHandler(db))
	r.PUT("/prices/:id", updatePriceHandler(db))
}

func listPricesHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "List prices - TODO"})
	}
}

func createPriceHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Create price - TODO"})
	}
}

func updatePriceHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(http.StatusOK, gin.H{"message": "Update price", "id": id})
	}
}
