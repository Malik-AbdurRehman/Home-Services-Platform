'use server'
export async function SubmitData(formData: FormData){
    const name= formData.get('name');
    const email= formData.get('email');

    console.log("Registered Successfully: ", name,email);
}