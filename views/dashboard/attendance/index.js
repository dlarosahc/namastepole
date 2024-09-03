const classesContent = document.querySelector('#classes-content');
const attendanceHead = document.querySelector('#attendance-head');
const titleClient = document.querySelector('#title-client');
const searchInput = document.querySelector('#search-input');


let userLoggedIn = null;
(async () => {
    const {data } = await axios.get('/api/users/logged');
    userLoggedIn = data;

    if(userLoggedIn.rol === 'client'){
        attendanceHead.children[0].children[1].classList.remove('flex');
        attendanceHead.children[0].children[1].classList.add('hidden');
        searchInput.classList.add('hidden');
    }
    
    

   

})();





(async () => {
    try {
        const { data } = await axios.get('/api/class/two', {
            withCredentials: true
        });
      if (data.lenght === 0) {
        const tableItem = document.createElement('div');
        tableItem.classList.add = ('flex', 'justify-center', 'items-center')
        tableItem.innerHTML = '<p class="text-center text-gray-500 font-medium">Sin asistencias registradas.</p>';
        titleClient.append(tableItem);
        
      }
      
     
      
     if (userLoggedIn.rol === 'client'){
        const userName = userLoggedIn.name
        const userClass = data.filter(({ name }) => name === userName);
        console.log(userClass);
        userClass.sort((a, b) => new Date(b.date) - new Date(a.date));
        userClass.forEach(data => {
            const tableItem = document.createElement('tr');
            tableItem.classList.add('w-full',  'text-sd', 'text-center', 'rtl:text-right', 'text-gray-500', 'overflow-x-auto');
            tableItem.innerHTML = `<tr class="bg-white border-b">
                  
                 <td class="px-6 py-4">
                     ${data.date}
                 </td>
                 
                 <td class="px-6 py-4">
                     ${data.schedule.discipline}
                 </td>
                 <td class="px-6 py-4">
                     ${data.schedule.time}
                 </td>
                  ${data?.attended === false? (
                                `<td class="flex justify-center px-6 py-4">
                   <button class="check-btn cursor-default">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                   </button>  
                </td>`
                             ) : (
                                `
                               <td class="flex  justify-center px-6 py-4">
                   <button class="check-btn cursor-default">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
                   </button>  
                </td>
                                `
                             )}
                
             </tr>`;
             classesContent.append(tableItem);
        });

        
        
     } else if (userLoggedIn.rol === 'admin'){
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        data.forEach(data => {
            const tableItem = document.createElement('tr');
            tableItem.classList.add('w-full',  'text-sd', 'text-center', 'rtl:text-right', 'text-gray-500', 'overflow-x-auto');
            tableItem.innerHTML = `<tr class="bg-white border-b">
                  
                 <td class="px-6 py-4">
                     ${data.date}
                 </td>
                 <td class="px-6 py-4">
                     ${data.name}
                 </td>
                 <td class="px-6 py-4">
                     ${data.schedule.discipline}
                 </td>
                 <td class="px-6 py-4">
                     ${data.schedule.time}
                 </td>
                  ${data?.attended === false? (
                                `<td class="flex justify-center px-6 py-4">
                   <button class="check-btn cursor-default">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                   </button>  
                </td>`
                             ) : (
                                `
                               <td class="flex  justify-center px-6 py-4">
                   <button class="check-btn cursor-default">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
                   </button>  
                </td>
                                `
                             )}
                
             </tr>`;
             classesContent.append(tableItem);
        });

    } 
    } catch (error) {
         console.log(error);
         //window.location.pathname = '/login'
    }
  
        
})();
        
        
        
   
    