import streamlit as st
import json
import requests
from typing import Optional
from dotenv import load_dotenv

# Constants
load_dotenv()

# Access the variables
BASE_API_URL = os.getenv("BASE_API_URL")
LANGFLOW_ID = os.getenv("LANGFLOW_ID")
FLOW_ID = os.getenv("FLOW_ID")
APPLICATION_TOKEN = os.getenv("APPLICATION_TOKEN")
TWEAKS = {
    "ChatInput-8AK8H": {},
    "Prompt-S1Fj7": {},
    "ChatOutput-m0Zjb": {},
    "GoogleGenerativeAIModel-rIO5E": {},
    "TextInput-XSk1J": {}
}

def run_flow(message: str,
             endpoint: str,
             output_type: str = "chat",
             input_type: str = "chat",
             tweaks: Optional[dict] = None,
             application_token: Optional[str] = None) -> dict:
    """
    Run a flow with a given message and optional tweaks.

    :param message: The message to send to the flow
    :param endpoint: The ID or the endpoint name of the flow
    :param tweaks: Optional tweaks to customize the flow
    :return: The JSON response from the flow
    """
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{endpoint}"

    payload = {
        "input_value": message,
        "output_type": output_type,
        "input_type": input_type,
    }
    headers = {"Authorization": "Bearer " + application_token, "Content-Type": "application/json"} if application_token else None
    if tweaks:
        payload["tweaks"] = tweaks

    response = requests.post(api_url, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()

# Streamlit App
st.title("Langflow Chatbot")
st.markdown("""This app interacts with the Langflow API to provide chatbot functionality.""")

# Initialize chat history
if "messages" not in st.session_state:
    st.session_state["messages"] = []

# Input section
message = st.text_area("Enter your message:", placeholder="Type your question here...")

# Submit button
if st.button("Send"):
    if not message.strip():
        st.error("Message cannot be empty!")
    else:
        try:
            # Run the flow
            with st.spinner("Processing your message..."):
                response = run_flow(
                    message=message,
                    endpoint=FLOW_ID,
                    output_type="chat",
                    input_type="chat",
                    tweaks=TWEAKS,
                    application_token=APPLICATION_TOKEN
                )
                response_text = response.get("outputs", [{}])[0].get("outputs", [{}])[0].get("results", {}).get("message", {}).get("text", "No response")

            # Update chat history
            st.session_state["messages"].append({"user": message, "bot": response_text})
        except requests.exceptions.RequestException as e:
            st.error(f"API request failed: {e}")
        except KeyError:
            st.error("Unexpected response structure from the API.")

# Display chat history
if st.session_state["messages"]:
    st.subheader("Chat History")
    for chat in st.session_state["messages"]:
        st.markdown(f"**You:** {chat['user']}")
        st.markdown(f"**Bot:** {chat['bot']}")
        st.markdown("---")
