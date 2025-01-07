import fetch from 'node-fetch';

export default class LangflowClient {
    constructor(baseURL, applicationToken) {
        if (!applicationToken) {
            throw new Error('Application token is required');
        }
        this.baseURL = baseURL;
        this.applicationToken = applicationToken;
    }

    async post(endpoint, body, headers = {}) {
        const requestHeaders = {
            "Authorization": `Bearer ${this.applicationToken}`,
            "Content-Type": "application/json",
            ...headers
        };

        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify(body)
            });

            const responseMessage = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
            }
            return responseMessage;
        } catch (error) {
            console.error('Request Error:', error.message);
            throw error;
        }
    }

    async initiateSession(flowId, langflowId, inputValue, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
    }

    async runFlow(flowIdOrName, langflowId, inputValue, inputType = 'chat', outputType = 'chat', tweaks = {}, stream = false) {
        try {
            const initResponse = await this.initiateSession(flowIdOrName, langflowId, inputValue, inputType, outputType, stream, tweaks);
            if (!stream && initResponse && initResponse.outputs) {
                const flowOutputs = initResponse.outputs[0];
                const firstComponentOutputs = flowOutputs.outputs[0];
                const output = firstComponentOutputs.outputs.message;
                return output.message.text;
            }
            return initResponse;
        } catch (error) {
            console.error('Error running flow:', error);
            throw error;
        }
    }
}