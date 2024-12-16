class ApiManager {
    constructor(){
        this.csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        this.data = {
            action: null,
            payload: null,
            csrf_token: this.csrfToken
        };
    }

    getData = async (action, path, payload = null) => {
        try {
            this.data.action = action;
            this.data.payload = payload;
            
            const params = new URLSearchParams(this.data).toString();
            const urlWithParams = `${path}?${params}`;
            
            const response = await fetch(urlWithParams, { 
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            let clone = response.clone();
            let jsonResult = null;
            await response.json().then(result => { jsonResult = result; }).catch(async (error) => { let text = await clone.text(); console.log(text);});
            return jsonResult;
        }
        catch (error) {
            console.error('Request failed:', error);
            return null;
        }
    }

    setData = async (action, path, payload) => {
        try {
            this.data.action = action;
            this.data.payload = payload;

            const response = await fetch(path, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.data),
            });

            let responseClone = response.clone();
    
            try {
                const jsonResult = await response.json();
                return jsonResult;
            } catch (jsonError) {
                const errorText = await responseClone.text();
                console.error('Failed to parse JSON. Response text:', errorText);
                throw jsonError;
            }
        } catch (error) {
            console.error('Request failed:', error.message || error);
            return null;
        }
    }

    setDataWithFiles = async (action, path, payload, files) => {
        try {
            this.data.action = action;
            this.data.payload = payload;
    
            const formData = new FormData();
            formData.append('data', JSON.stringify(this.data));
            if (files && files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    formData.append('files[]', files[i]);
                }
            }
            
            const response = await fetch(path, {
                method: 'POST',
                body: formData
            });
            let clone = response.clone();
            let jsonResult = null;
            await response.json().then(result => { jsonResult = result; }).catch(async (error) => { let text = await clone.text(); console.log(text);});
            return jsonResult;
        } catch (error) {
            console.error('Request failed:', error.message);
            return null;
        }
    };
}