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
## Azure Module Details

The **`azure`** folder contains the core functionality of Shazam, focusing on Azure integration and Promptflow workflows.

### Key Files:

- **`.env`**: Environment configuration for Azure credentials and settings.
- **`copilot_flow/bridge.js`**: JavaScript file for bridging workflows.
- **`copilot_flow/chat.prompty`**: Prompt template for chat-based workflows.
- **`copilot_flow/copilot.py`**: Python script handling copilot functionality.
- **`copilot_flow/flow.flex.yaml`**: Configuration file for flexible workflows.
- **`copilot_flow/input_with_chat_history.json`**: Sample input data with chat history.
- **`copilot_flow/oneQuestionEval.py`**: Script for evaluating single question workflows.
- **`copilot_flow/queryIntent.prompty`**: Prompt template for intent-based queries.
