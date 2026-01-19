package config

import (
	"os"
)

type Config struct {
	DB     DBConfig
	S3     S3Config
	JWT    JWTConfig
	Server ServerConfig
}

type DBConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
}

type S3Config struct {
	Endpoint  string
	Bucket    string
	Region    string
	AccessKey string
	SecretKey string
}

type JWTConfig struct {
	Secret string
}

type ServerConfig struct {
	Port string
}

func Load() *Config {
	return &Config{
		DB: DBConfig{
			Host:     getEnv("DB_HOST", "localhost"),
			Port:     getEnv("DB_PORT", "5432"),
			User:     getEnv("POSTGRES_USER", "repuestos"),
			Password: getEnv("POSTGRES_PASSWORD", "repuestos123"),
			DBName:   getEnv("POSTGRES_DB", "repuestos_db"),
			SSLMode:  getEnv("DB_SSLMODE", "disable"),
		},
		S3: S3Config{
			Endpoint:  getEnv("S3_ENDPOINT", "http://localhost:9000"),
			Bucket:    getEnv("S3_BUCKET", "repuestos"),
			Region:    getEnv("S3_REGION", "us-east-1"),
			AccessKey: getEnv("S3_ACCESS_KEY", "minioadmin"),
			SecretKey: getEnv("S3_SECRET_KEY", "minioadmin"),
		},
		JWT: JWTConfig{
			Secret: getEnv("JWT_SECRET", "your-secret-key-change-in-production"),
		},
		Server: ServerConfig{
			Port: getEnv("API_PORT", "8080"),
		},
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
