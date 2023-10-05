
"use server"

export async function SendMail(form){
    try{
        const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          };
      
          const response = await fetch("http://localhost:3001/api/mail", requestOptions);

          if (response.ok){
            const data = response.json()
            return data
          }else{
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    }catch(err){
        
    }
}