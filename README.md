
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