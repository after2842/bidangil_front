"use client";
import React, { useState } from "react";
import JsxParser from 'react-jsx-parser';
export default function SubmitGPTform()
{
    const [inputText, setInputText] = useState('')
    const [response, setResponse] = useState(``)
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try{
            const response = await fetch('http://127.0.0.1:8000/gpt/',{
                method:'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({'text': inputText})
            });

            const data = await response.json();
            setResponse(data.response)
        }catch (error){
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className="p-6 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full border p-4 rounded-lg shadow"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your prompt"
            />
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
          </form>
    
          <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow">
            {response && (
              <JsxParser
                jsx={response}
                bindings={{}}
                components={{}}
                renderInWrapper={false}
              />
            )}
          </div>
        </div>
      );
    
}

