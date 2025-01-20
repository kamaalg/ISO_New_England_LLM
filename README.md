# Shazam

**Shazam** is a project that integrates with Azure services to process queries and execute workflows using Promptflow. This project enables seamless management of Azure resources and testing of custom workflows with ease.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Azure Module Details](#azure-module-details)
- [Frontend Module Details](#frontend-module-details)
- [Scraping Module Details](#scraping-module-details)
- [Running Instructions](#running-instructions)
- [To-Do](#to-do)

---

## Overview

**Shazam** is designed to simplify the interaction with Azure services by offering a robust framework for running and testing workflows. It uses tools like Azure CLI and Promptflow to enable users to manage and execute queries efficiently.

## Features

- **Azure CLI Integration**: Seamlessly log in and manage Azure resources.
- **Promptflow Workflows**: Test and execute custom workflows for various use cases.
- **Error Handling**: Built-in mechanisms to provide informative error messages.

### Prerequisites

- **Homebrew** (MacOS):
  ```bash
  brew update && brew install azure-cli
  ```
- **Azure CLI**:
  ```bash
    az login
  ```
- **Python Packages:
  ```
    python -m pip install --upgrade pip
    pip install promptflow azure-identity
  ```
## Project Structure
```
├── .idea/                 # IDE configuration files
├── copilot_flow/          # Workflow and flow definitions
├── tests.py               # Testing scripts
├── package.json           # Project dependencies
├── README.md              # Project documentation
├── .gitignore             # Git ignore rules
├── azure/                 # Azure module for managing workflows
├── Front-end-02/          # Frontend components
├── shazam-scraping/       # Scraping scripts and collected data
```

