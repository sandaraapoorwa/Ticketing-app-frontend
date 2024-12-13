import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8080';

export const endpoints = {
    configureSystem: `${API_BASE_URL}/ticketing/config`,
    startSystem: `${API_BASE_URL}/ticketing/start`,
    stopSystem: `${API_BASE_URL}/ticketing/stop`,
    getStatus: `${API_BASE_URL}/ticketing/status`,
    getLogs: `${API_BASE_URL}/ticketing/logs`,
};

export const configureSystem = async (configData) => {
    try {
        const response = await axios.post(endpoints.configureSystem, configData);
        return response.data;
    } catch (error) {
        console.error('Error configuring system:', error);
        throw error;
    }
};
export const startSystem = async () => {
    try {
        const response = await axios.post(endpoints.startSystem);
        return response.data;
    } catch (error) {
        console.error('Error starting system:', error);
        throw error;
    }
};
export const stopSystem = async () => {
    try {
        const response = await axios.post(endpoints.stopSystem);
        return response.data;
    } catch (error) {
        console.error('Error stopping system:', error);
        throw error;
    }
};

export const getStatus = async () => {
    try {
        const response = await axios.get(endpoints.getStatus);
        return response.data;
    } catch (error) {
        console.error('Error fetching status:', error);
        throw error;
    }
};

export const getLogs = async () => {
    try {
        const response = await axios.get(endpoints.getLogs);
        console.log('Raw API response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error fetching logs:', error);
        throw error;
    }
};

