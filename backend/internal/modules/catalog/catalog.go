package catalog

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.RouterGroup, db *sql.DB) {
	r.GET("/products", listProductsHandler(db))
	r.GET("/products/:id", getProductHandler(db))
	r.POST("/products", createProductHandler(db))
	r.PUT("/products/:id", updateProductHandler(db))
	r.DELETE("/products/:id", deleteProductHandler(db))
}

func listProductsHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "List products - TODO"})
	}
}

func getProductHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(http.StatusOK, gin.H{"message": "Get product", "id": id})
	}
}

func createProductHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Create product - TODO"})
	}
}

func updateProductHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(http.StatusOK, gin.H{"message": "Update product", "id": id})
	}
}

func deleteProductHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(http.StatusOK, gin.H{"message": "Delete product", "id": id})
	}
}
