# Shazam
To use this code, run the following in vscode
brew update && brew install azure-cli
az login
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install promptflow
pip install azure-identity

az login will prompt you for your azure credentials. You should have no issue here, text me if you do. 
In order to make a request, 

pf flow test --flow ./copilot_flow --inputs chat_input="sample query"

This is broken. Why? I still need to fix the quota issue.


TO-DO:
a) fix quota issue
b) fix constant re-authentication (az login) - maybe a key? This shouldn't be too hard
c) there's a weird dag/flex prompt flow error I don't understand. It doesn't seem to be breaking anything but there is unexpected behavior. Figure this out. 