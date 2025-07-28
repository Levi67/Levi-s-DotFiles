import json
import requests
from google.oauth2 import service_account
from google.auth.transport.requests import Request

# Path to your service account JSON
SERVICE_ACCOUNT_FILE = "service-account.json"
PROJECT_ID = "hermes-trading-627c5"  # <-- REPLACE with your actual project ID

# FCM target
DEVICE_TOKEN = "cNC5VVBGRGOVB1CA964D-B:APA91bFdyAxg5S0uHRdBFgORu_k18y030Ze9x1cYaDeO2-YrUb-uyb7eKJpulMagPVbsNF5o8iVQW9Sk6WJUYEkAzx5RVnPLRRC67AoLjmDUYU--RF6qnWU"  # <-- REPLACE with your FCM registration token

# Create a credentials object from the service account
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE,
    scopes=["https://www.googleapis.com/auth/firebase.messaging"]
)

# Refresh the token (get access token)
credentials.refresh(Request())
access_token = credentials.token

# Construct the FCM message payload
fcm_url = f"https://fcm.googleapis.com/v1/projects/{PROJECT_ID}/messages:send"
headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json; UTF-8",
}
message = {
    "message": {
        "token": DEVICE_TOKEN,
        "data": {
            "price": "Mobile daten funktionieren",
            "coin": "android app test",
            "signal": "Levi ist ein sigma",
            "alarm": "true"
        }
    }
}

# Send the request
response = requests.post(fcm_url, headers=headers, json=message)

# Print result
print("Status code:", response.status_code)
print("Response body:", response.text)

