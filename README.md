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
  
## Frontend Module Details

The **`Front-end-02`** folder contains components and scripts related to the user-facing part of Shazam. This module is intended for building and enhancing the frontend interface.

### Key Files:

- **`index.html`**: The main HTML file for the frontend interface.
- **`style.css`**: Stylesheet for the user interface.
- **`app.js`**:  Core JavaScript logic for handling user interactions.
- **`components/`**: A directory containing reusable frontend components.

## Scraping Module Details

The **`shazam-scraping`** folder contains scripts and data used to scrape documentation and resources from the ISO New England website. This module automates data collection for use within the project.

### Key Files:
- **`scraper.py`**: The main script for scraping data.
- **`requirements.txt`**: Python dependencies required for running the scraper.
- **`data/`**: Directory containing the scraped documentation and resources.

## Running Instructions

1. **Install Dependencies**:  
   Ensure all prerequisites are installed as outlined in the prerequisites section.

   ```
   brew update && brew install azure-cli
   az login
   python -m pip install --upgrade pip
   pip install promptflow azure-identity
----
2. **Run a workflow**:
   Use the following command to test a workflow using Promptflow:
```
pf flow test --flow ./copilot_flow --inputs chat_input="sample query"

```
Replace "sample query" with your desired input for testing.

3. **Run a Scraper**:
   To scrape data from the ISO New England website, run:
        ```
         python shazam-scraping/scraper.py
       ```
   The scraped data will be saved in the shazam-scraping/data directory.
4.**Run a server and frontend together**:
   ```

  

