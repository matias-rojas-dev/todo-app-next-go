package db

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

var DSN = "host=localhost user=postgres password=mysecretpassword dbname=gorm port=5432 sslmode=disable"

func DBConnection() {
	var err error
	DB, err = gorm.Open(postgres.Open(DSN), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	} else {
		log.Println("Database connection successful")
	}
}
