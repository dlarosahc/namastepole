const div = document.querySelector('#notification');

export const createNotification = (isError, message) => {
    
    if (isError){
        div.innerHTML = `
        <div class="max-w-7xl mx-auto px-2 flex justify-end">
            <p class="bg-red-700 p-4  rounded-lg font-bold text-white">${message}</p>
        </div>
    `
    } else {
        div.innerHTML = `
        <div class="max-w-7xl mx-auto px-2 flex justify-end">
            <p class="bg-green-700 p-4  rounded-lg font-bold text-white">${message}</p>
        </div>
    `
    }
   
}