const classesContent = document.querySelector('#classes-content');


let userLoggedIn = null;
(async () => {
    const {data } = await axios.get('/api/users/logged');
    userLoggedIn = data;
    
    
   console.log(userLoggedIn.name);
   

})();





(async () => {
    // try {
        const { data } = await axios.get('/api/class/two', {
            withCredentials: true
        });
      console.log(data);
      
     if (userLoggedIn.rol === 'client'){
        const userName = userLoggedIn.name
        const userClass = data.filter(({ name }) => name === userName);
        console.log(userClass);
        userClass.forEach(data => {
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
                   <button class="check-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                   </button>  
                </td>`
                             ) : (
                                `
                               <td class="flex  justify-center px-6 py-4">
                   <button class="check-btn">
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
                   <button class="check-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                   </button>  
                </td>`
                             ) : (
                                `
                               <td class="flex  justify-center px-6 py-4">
                   <button class="check-btn">
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
        
        
    //     data.forEach(payments => {
    //         const tableItem = document.createElement('tr');
    //         tableItem.id = payments.id
    //         tableItem.classList.add('w-full',  'text-sd', 'text-left', 'rtl:text-right', 'text-gray-500', 'overflow-x-auto');
    //         tableItem.innerHTML = `
    //          ${userLoggedIn?.rol === 'admin'? (
    //                             `<tr class="bg-white border-b">
    //              <td scope="row" class="flex justify-center px-6 py-4  font-medium text-red-500 whitespace-nowrap">
    //                 <button class="delete-btn">
    //                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    //                     <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    //                   </svg>
    //                 </button> 
    //             </td>
    //             <td class="px-6 py-4">
    //                 ${payments.date}
    //             </td>
    //             <td class="px-6 py-4">
    //                 ${payments.user.idNumber}
    //             </td>
    //             <td class="px-6 py-4">
    //                 ${payments.user.name}
    //             </td>
    //             <td class="px-6 py-4">
    //                 ${payments.package.name}
    //             </td>
    //             <td class="px-6 py-4">
    //                 ${payments.method}
    //             </td>
    //             <td class="text-center px-6 py-4">
    //                 ${payments.ref}
    //             </td>
    //             <td class="text-center px-6 py-4">
    //                 ${payments.amount}$
    //             </td>
    //             <td class="flex justify-center px-6 py-4">
    //                <button class="check-btn">
    //                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
    //                     <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    //                   </svg>
    //                </button>  
    //             </td>
    //             <td class="text-center px-6 py-4">
    //                 ${payments.classQuantity}
    //             </td>
    //         </tr>`
    //                          ) : (
    //                             `<tr class="bg-white border-b">
                 
    //             <td class="px-6 py-4">
    //                 ${payments.date}
    //             </td>
    //             <td class="px-6 py-4">
    //                 ${payments.user.idNumber}
    //             </td>
    //             <td class="px-6 py-4">
    //                 ${payments.user.name}
    //             </td>
    //             <td class="px-6 py-4">
    //                 ${payments.package.name}
    //             </td>
    //             <td class="px-6 py-4">
    //                 ${payments.method}
    //             </td>
    //             <td class="text-center px-6 py-4">
    //                 ${payments.ref}
    //             </td>
    //             <td class="text-center px-6 py-4">
    //                 ${payments.amount}$
    //             </td>
                
    //             <td class="text-center px-6 py-4">
    //                 ${payments.classQuantity}
    //             </td>
    //         </tr>`
    //                          )}
             
    //         `;
    //      if(userLoggedIn.rol === 'admin'){
    //        if(payments.approved){
    //         tableItem.children[8].children[0].innerHTML = `
    //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
    //         <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    //         </svg>
    //         `;
    //         } else {
    //             tableItem.children[8].children[0].innerHTML = `
    //                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
    //                  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    //                  </svg>
    //             `;   
    //         };
            
    //     }
            
    //         paymentsContent.append(tableItem);
    //     });
        
    // } catch (error) {
    //     // window.location.pathname = '/login'
    //     console.log(error);
        
    // }
    
    })();