
# SmartHint Project

## Instructions to get my project running

- [Prerequisites](#prerequisites)

- [Installation](#installation)

- [Usage](#usage)

- [Documentation](#documentation)

## Prerequisites

- .NET Core 6.0

- Node.js v12.22.12

- Npm v6.14.16
- MySql
- Dotnet-ef Tool

## Installation

```bash
# Clone the repository
git clone https://github.com/danielbesen/SmartHintNetCoreProject.git

# Navigate to the project directory
cd SmartHintNetCoreProject

# Navigate to the appsettings.json file
cd backend/src/SmartHint.API/appsettings.json

# Insert your credentials and database name
Server=localhost;Port=3306;Database=mydb;User=myuser;Password=mypass;

# Navigate to the SmartHint.API folder
cd backend/src/SmartHint.API

# Run the followings commands
dotnet restore
dotnet build

# Run the following command
dotnet tool install --global dotnet-ef 

# Create migrations and update database
cd Backend/src
dotnet ef migrations add Initial -p SmartHint.Persistance -s SmartHint.API
dotnet ef database update -s SmartHint.API

# Navigate to the SmartHint-App folder
cd frontend/SmartHint.API

# Install dependencies
npm install
```
## Usage
```bash

# Navigate to the SmartHint.API folder
cd backend/src/SmartHint.API

# Start the server application
dotnet watch run

# The application will open in your browser
"https://localhost:7125/swagger/index.html"

# Navigate to the SmartHint-App folder
cd frontend/SmartHint.API

# Start the app
npm start

# The application will open in your browser
"http://localhost:4200/"
```

## Documentation

You can use the documentation to better understand the application and also make requests to the API
```bash
# Access the swagger documentation in your browser
"https://localhost:7125/swagger/index.html"
```
I created the database using migrations, but here follows the creation script

```bash
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema smartdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema smartdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `smartdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `smartdb` ;

-- -----------------------------------------------------
-- Table `smartdb`.`__efmigrationshistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartdb`.`__efmigrationshistory` (
  `MigrationId` VARCHAR(150) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `ProductVersion` VARCHAR(32) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  PRIMARY KEY (`MigrationId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `smartdb`.`customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartdb`.`customers` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Type` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Email` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Phone` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `RegisterDate` DATETIME(6) NULL DEFAULT NULL,
  `IdentityDocument` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `StateRegistration` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `Gender` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  `DateOfBirth` DATETIME(6) NULL DEFAULT NULL,
  `IsBlocked` TINYINT(1) NULL DEFAULT NULL,
  `Password` LONGTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 31
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```