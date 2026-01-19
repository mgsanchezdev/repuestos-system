package mercadolibre

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.RouterGroup, db *sql.DB) {
	r.GET("/sync", syncHandler(db))
	r.POST("/publish", publishHandler(db))
	r.GET("/listings", listListingsHandler(db))
}

func syncHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Sync MercadoLibre - TODO"})
	}
}

func publishHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Publish to MercadoLibre - TODO"})
	}
}

func listListingsHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "List listings - TODO"})
	}
}
