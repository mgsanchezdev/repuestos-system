package main

import (
	"log"
	"os"

	"repuestos-platform/backend/internal/config"
	"repuestos-platform/backend/internal/db"
	"repuestos-platform/backend/internal/middleware"
	"repuestos-platform/backend/internal/modules/auth"
	"repuestos-platform/backend/internal/modules/catalog"
	"repuestos-platform/backend/internal/modules/imports"
	"repuestos-platform/backend/internal/modules/mercadolibre"
	"repuestos-platform/backend/internal/modules/pricing"
	"repuestos-platform/backend/internal/modules/stock"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Cargar variables de entorno
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// Cargar configuración
	cfg := config.Load()

	// Conectar a base de datos
	database, err := db.Connect(cfg.DB)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer database.Close()

	// Inicializar router
	r := gin.Default()

	// Middleware
	r.Use(middleware.CORS())
	r.Use(middleware.Logger())

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// API v1
	v1 := r.Group("/api/v1")
	{
		// Auth
		authGroup := v1.Group("/auth")
		auth.RegisterRoutes(authGroup, database)

		// Catalog
		catalogGroup := v1.Group("/catalog")
		catalog.RegisterRoutes(catalogGroup, database)

		// Pricing
		pricingGroup := v1.Group("/pricing")
		pricing.RegisterRoutes(pricingGroup, database)

		// Stock
		stockGroup := v1.Group("/stock")
		stock.RegisterRoutes(stockGroup, database)

		// Imports
		importsGroup := v1.Group("/imports")
		imports.RegisterRoutes(importsGroup, database)

		// MercadoLibre
		mlGroup := v1.Group("/mercadolibre")
		mercadolibre.RegisterRoutes(mlGroup, database)
	}

	// Iniciar servidor
	port := os.Getenv("API_PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
