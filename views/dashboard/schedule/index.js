import { createNotification } from "../../components/notification.js";

const form = document.querySelector('#form');
const selectDay = document.querySelector('#select-day');
const selectTime = document.querySelector('#select-time');
const selectDiscipline = document.querySelector('#select-discipline');
const inputDate = document.querySelector('#input-date');
const dayTitle = document.querySelector('#day-title');
const dayDate = document.querySelector('#day-date');
const scheduleSection = document.querySelector('#schedule-section')
const scheduleForm = document.querySelector('#schedule-form');
const scheduleList = document.querySelector('#schedule-list');
const inputScheduleDate = document.querySelector('#input-schedule-date');
const scheduleAttendance = document.querySelector('#schedule-attendance');
const attendanceList = document.querySelector('#attendance-list');
const paymentsTable = document.querySelector('#payments-table');
const dateNow = new Date(Date.now()).toISOString().split('T')[0];
const dateNow1 = new Date();
const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const dayIndex = dateNow1.getDay();
let day = daysOfWeek[dayIndex] ;

console.log(dateNow1);
inputDate.value = dateNow;

let userLoggedIn = null;

(async () => {
    const {data } = await axios.get('/api/users/logged');
    userLoggedIn = data;
    if(userLoggedIn.rol === 'admin'){
        form.classList.remove('hidden');
        form.classList.add('flex');
        dayTitle.classList.remove('hidden');
    }

    if (userLoggedIn.rol === 'client') {
      paymentsTable.children[0].children[0].children[0].classList.add('hidden');
      paymentsTable.children[0].children[0].children[2].classList.add('hidden');
      paymentsTable.children[0].children[0].children[3].classList.add('hidden');
      
    };

})();



//Aqui se agregan los horarios
form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const newSchedule = {
            dayOfWeek: selectDay.value,
            time: selectTime.value,
            discipline: selectDiscipline.value,
            
        }

        console.log(newSchedule);
        

        
        const { data } = await axios.post('/api/schedule', newSchedule);
        selectDay.value = '';
        selectTime.value = '';
        selectDiscipline.value = '';
        
        
        createNotification(false, data)
        setTimeout(() => {
            notification.innerHTML = '';
        }, 3000);
       
        
     
    } catch (error) {
        createNotification(true, error.response.data.error);
        setTimeout(() => {
            notification.innerHTML = '';
        }, 3000)
        
        
    }
   
   
});




scheduleSection.addEventListener('click', async e => {
  //Aqui se agregan los alumnos activos a la clase
  if(e.target.closest('.schedule-btn')){
    const { data }  = await axios.get('/api/payments', {
      withCredentials: true
    });
    
    
    scheduleForm.classList.remove('hidden');
    scheduleForm.classList.add('flex');
    inputScheduleDate.value = dateNow;
    const formTitle = e.target.closest('.schedule-btn').parentElement.children[1];
    const formTime = e.target.closest('.schedule-btn').parentElement.children[0];
    scheduleForm.children[0].children[0].innerHTML = formTitle.innerHTML;
    scheduleForm.children[0].children[1].innerHTML = formTime.innerHTML;
    const scheduleId = e.target.closest('.schedule-btn').parentElement.parentElement.parentElement.parentElement.id;
    const activeStudents = data.filter(({ approved, classQuantity }) => approved === true && classQuantity > 0 );
    console.log(activeStudents);

    const closeBtn = scheduleForm.children[2];
    
    closeBtn.addEventListener('click', e => {
      
      scheduleForm.classList.add('hidden');
      scheduleForm.classList.remove('flex');
    })
    
    
    
    
    

    activeStudents.forEach(payments => {
      const listUser = document.createElement('li');
      listUser.id = payments.id;
      listUser.classList.add('flex', 'items-center', 'border-b-solid', 'border-b-2', 'border-b-purple-500', 'w-full', 'text-start')
      listUser.innerHTML = `
                   ${payments.user.name}
                    <div class="grid ml-auto place-items-center justify-self-end">
                      <button
                        class="add-btn relative h-10 max-h-[40px] w-10 max-w-[40px] select-none  text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 rounded-lg text-purple-500 hover:text-white hover:bg-purple-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                          </svg>
                          
                        </span>
                      </button>
                    </div>
      `
      scheduleList.append(listUser);
    });


    scheduleList.addEventListener('click', async e => {
      if(e.target.closest(".add-btn")){
       
        
        const addBtn = e.target.closest(".add-btn");
        const userId = addBtn.parentElement.parentElement.id
        const list = addBtn.parentElement.parentElement
        const nameId = addBtn.parentElement.parentElement.textContent;
        const cleanName = nameId.trim().split(' ');
        const fullName = cleanName.join(' ');
        console.log(fullName);
        console.log(list);
        
       
        
        
        

        
        try {
          const newClass = {
              date: dateNow,
              schedule: scheduleId,
              payments: userId,
              name: fullName,
              
             }
             console.log(newClass);
             

             const { data } = await axios.post('/api/class', newClass);
             list.classList.add('hidden');
             createNotification(false, data)
             setTimeout(() => {
             notification.innerHTML = '';
             }, 3000);
             
           

        } catch (error) {
           console.log(error);
           
        }
        
      }
    });   
    
  }
  //Aqui se ven los alumnos asignados a la clase
  if(e.target.closest('.see-btn')){
    scheduleAttendance.classList.remove('hidden');
    scheduleAttendance.classList.add('flex');
    const title = e.target.closest('.see-btn').parentElement.children[1];
    const time = e.target.closest('.see-btn').parentElement.children[0];
    scheduleAttendance.children[0].children[0].innerHTML = title.innerHTML;
    scheduleAttendance.children[0].children[1].innerHTML = time.innerHTML;
    scheduleAttendance.children[0].children[2].value = dateNow;
    const closeBtn = scheduleAttendance.children[2];
    
    closeBtn.addEventListener('click', e => {
      scheduleAttendance.classList.add('hidden');
      scheduleAttendance.classList.remove('flex');
      location.reload();
    })

    
    
    
    const scheduleId = e.target.closest('.see-btn').parentElement.parentElement.parentElement.parentElement.id;
    
    
    const { data }  = await axios.get('/api/class', {
      withCredentials: true
    });
    console.log(data);
    
    const selectedSchedule = data.filter(({ schedule, date }) => schedule === scheduleId && date === dateNow  );
    console.log(selectedSchedule);
    console.log(dateNow);
    
    
    selectedSchedule.forEach(data => {
      const attendedStudents = document.createElement('tr');
      attendedStudents.id = data.id;
      attendedStudents.classList.add('w-full',  'text-sd', 'text-center', 'rtl:text-right', 'text-gray-500', 'overflow-x-auto')
      attendedStudents.innerHTML = `
 ${userLoggedIn?.rol === 'admin'? (
                                `<tr class="bg-white border-b">
                            <td scope="row" class="flex justify-center px-6 py-4 font-medium text-red-500  whitespace-nowrap">
                                <button class="delete-asist-btn">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                  </svg>
                                </button> 
                            </td>
                            <td class="px-6 py-4">
                                ${data.name}
                            </td>
                            <td class="flex justify-center px-6 md:w-full py-4">
                                <button class="check-asist-btn">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 hover:text-white hover:bg-red-500 size-8">
                                     <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                   </svg>
                                </button>  
                             </td>
                            <td id="${data.payments.id}" class="px-6 py-4">
                                <button class="load-asist-btn"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-green-500 hover:text-white hover:bg-green-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                  </svg></button>
                            </td>
                            
                        </tr>`
                             ) : (
                                `
                                <tr class="bg-white border-b">
                            
                            <td class="px-6 py-4">
                                ${data.payments.user.name}
                            </td>
                           
                            
                        </tr>`
                             )}

       
                           
      `
      attendanceList.append(attendedStudents);

      if(data.attended){
      if(userLoggedIn.rol === 'admin'){ 
        
        attendedStudents.children[2].children[0].innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        `;
        } else {
            attendedStudents.children[2].children[0].innerHTML = `
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-red-500 size-8">
                 <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                 </svg>
            `;   
        };} 
      attendanceList.append(attendedStudents);
      
      
    });
    };
});

//Aqui vamos a crear la logica para marcar la asistencia y cargar la clase
attendanceList.addEventListener('click', async e => {
  //Marcar asistencia 
  if(e.target.closest('.check-asist-btn')){
    const checkBtn = e.target.closest('.check-asist-btn');
   const tableItem = checkBtn.parentElement.parentElement;
   
   
   
   
   const checkIcon = checkBtn.children[0];
   if (!tableItem.classList.contains('approved')){
    await axios.patch(`/api/class/${tableItem.id}/attended`, { attended: true });
    checkIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-green-500 size-8">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
    `;
    tableItem.classList.add('approved');
    } else {
        await axios.patch(`/api/payments/${tableItem.id}`, { attended: false });
        tableItem.classList.remove('approved');  
        checkIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="pending text-red-500 size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
        `
    };
    
   }
   //Cargar la clase (reducir en 1 la cantidad de clases disponibles, se puede reducir aunque hayan asistido o no)
  if(e.target.closest('.load-asist-btn')){
    const loadAsistBtn = e.target.closest('.load-asist-btn');
    const paymentId = loadAsistBtn.parentElement.id;
    const list = loadAsistBtn.parentElement.parentElement;
    
    await axios.patch(`/api/payments/${paymentId}/classQuantity`, {  classQuantity: -1});
    list.classList.add('hidden');
    createNotification(false, data)
    setTimeout(() => {
    notification.innerHTML = '';
    }, 3000);
    

  };

});

(async () => {
    try {
        const { data } = await axios.get('/api/schedule', {
            withCredentials: true
        });
            
            const monday = data.filter(({ dayOfWeek }) => dayOfWeek === 'monday' );
            const tuesday = data.filter(({ dayOfWeek }) => dayOfWeek === 'tuesday' );
            const wednesday = data.filter(({ dayOfWeek }) => dayOfWeek === 'wednesday' );
            const thursday = data.filter(({ dayOfWeek }) => dayOfWeek === 'thursday' );
            const friday = data.filter(({ dayOfWeek }) => dayOfWeek === 'friday' );
            const saturday = data.filter(({ dayOfWeek }) => dayOfWeek === 'saturday' );

            

            const dayHead = document.createElement('div')
            dayHead.classList.add('max-w-screen-xl',  'flex', 'lg:flex-col', 'px-4', 'py-4', 'mx-auto', 'lg:px-6', 'sm:py-6', 'lg:py-6');
            dayHead.innerHTML = `
            <div class="max-w-3xl mx-auto text-center">
                <h2 id="day-title" class="text-4xl font-extrabold leading-tight tracking-tight text-gray-900">
                ${day}
                </h2>
          
                <div class="mt-4">
                 <p id="day-date" class="inline-flex items-center text-lg font-medium text-primary-600">${dateNow}</p>
                </div>
              </div>
            `;

            scheduleSection.append(dayHead)

       if (day === 'Lunes') {
        monday.forEach(schedule => {
            const scheduleDiv = document.createElement('div');
            scheduleDiv.id = schedule.id;
            scheduleDiv.classList.add('max-w-screen-xl',  'border-b-solid', 'border-b-2', 'border-b-black/50', 'flex', 'lg:flex-col',   'px-4', 'py-4', 'mx-auto', 'lg:px-4', 'sm:py-4', 'lg:py-4');
            scheduleDiv.innerHTML = `
              
           ${userLoggedIn?.rol === 'admin'? (
                                `<div class=" max-w-3xl mx-auto justify-between">
              <div class="-my-4 divide-y divide-gray-200">
                <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                  <p class="w-32 text-lg font-normal text-gray-500 sm:text-right  shrink-0">
                  ${schedule.time}
                  </p>
                  <h3 class="text-lg font-semibold  ">
                  ${schedule.discipline}
                  </h3>
              </button>
              <button class="schedule-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  Agregar
              </button>
              <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
               <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
               </svg>

              </button>
          </div>  
          </div>
          </div>`
                             ) : (
                                `
                                <div class=" max-w-3xl mx-auto justify-between">
              <div class="-my-4 divide-y divide-gray-200">
                <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                  <p class="w-32 text-lg font-normal text-gray-500 sm:text-right  shrink-0">
                  ${schedule.time}
                  </p>
                  <h3 class="text-lg font-semibold  ">
                  ${schedule.discipline}
                  </h3>
              
              <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
               <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
               </svg>

              </button>
          </div>  
          </div>
          </div>
                                `
                             )}
            
             

            
          `;

          scheduleSection.append(scheduleDiv);
            
            
            
        })
        
       } else if (day === 'Martes') {
        tuesday.forEach(schedule => {
            const scheduleDiv = document.createElement('div');
            scheduleDiv.id = schedule.id;
            scheduleDiv.classList.add('max-w-screen-xl',  'border-b-solid', 'border-b-2', 'border-b-black/50', 'flex', 'lg:flex-col',   'px-4', 'py-4', 'mx-auto', 'lg:px-4', 'sm:py-4', 'lg:py-4');
            scheduleDiv.innerHTML = `
              
            ${userLoggedIn?.rol === 'admin'? (
                                 `<div class=" max-w-3xl mx-auto justify-between">
               <div class="-my-4 divide-y divide-gray-200">
                 <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                   <p class="w-32 text-lg font-normal text-gray-500 sm:text-right  shrink-0">
                   ${schedule.time}
                   </p>
                   <h3 class="text-lg font-semibold  ">
                   ${schedule.discipline}
                   </h3>
               </button>
               <button class="schedule-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                   Agregar
               </button>
               <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
 
               </button>
           </div>  
           </div>
           </div>`
                              ) : (
                                 `
                                 <div class=" max-w-3xl mx-auto justify-between">
               <div class="-my-4 divide-y divide-gray-200">
                 <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                   <p class="w-32 text-lg font-normal text-gray-500 sm:text-right  shrink-0">
                   ${schedule.time}
                   </p>
                   <h3 class="text-lg font-semibold  ">
                   ${schedule.discipline}
                   </h3>
               
               <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
 
               </button>
           </div>  
           </div>
           </div>
                                 `
                              )}
             
              
 
             
           `;

          scheduleSection.append(scheduleDiv);
            
            
            
        })
        
       } else if(day === 'Miércoles') {
        wednesday.forEach(schedule => {
            const scheduleDiv = document.createElement('div');
            scheduleDiv.id = schedule.id;
            scheduleDiv.classList.add('max-w-screen-xl',    'border-b-solid', 'border-b-2', 'border-b-black/50', 'flex', 'lg:flex-col',   'px-4', 'py-4', 'mx-auto', 'lg:px-4', 'sm:py-4', 'lg:py-4');
            scheduleDiv.innerHTML = `
              
            ${userLoggedIn?.rol === 'admin'? (
                                 `<div class=" max-w-3xl mx-auto justify-between">
               <div class="-my-4 divide-y divide-gray-200">
                 <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                   <p class="w-32 text-lg font-normal text-gray-500 sm:text-right  shrink-0">
                   ${schedule.time}
                   </p>
                   <h3 class="text-lg font-semibold  ">
                   ${schedule.discipline}
                   </h3>
               </button>
               <button class="schedule-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                   Agregar
               </button>
               <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
 
               </button>
           </div>  
           </div>
           </div>`
                              ) : (
                                 `
                                 <div class=" max-w-3xl mx-auto justify-between">
               <div class="-my-4 divide-y divide-gray-200">
                 <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                   <p class="w-32 text-lg font-normal text-gray-500 sm:text-right  shrink-0">
                   ${schedule.time}
                   </p>
                   <h3 class="text-lg font-semibold  ">
                   ${schedule.discipline}
                   </h3>
               
               <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
 
               </button>
           </div>  
           </div>
           </div>
                                 `
                              )}
             
              
 
             
           `;

          scheduleSection.append(scheduleDiv);
            
            
            
        })
        
       } else if(day === 'Jueves') {
        thursday.forEach(schedule => {
            const scheduleDiv = document.createElement('div');
            scheduleDiv.id = schedule.id;
            scheduleDiv.classList.add('max-w-screen-xl',  'border-b-solid', 'border-b-2', 'border-b-black/50', 'flex', 'lg:flex-col',   'px-4', 'py-4', 'mx-auto', 'lg:px-4', 'sm:py-4', 'lg:py-4');
            scheduleDiv.innerHTML = `
              
           ${userLoggedIn?.rol === 'admin'? (
                                `<div class=" max-w-3xl mx-auto justify-between">
              <div class="-my-4 divide-y divide-gray-200">
                <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                  <p class="w-32 text-lg font-normal text-gray-500 sm:text-right  shrink-0">
                  ${schedule.time}
                  </p>
                  <h3 class="text-lg font-semibold  ">
                  ${schedule.discipline}
                  </h3>
              </button>
              <button class="schedule-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  Agregar
              </button>
              <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
               <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
               </svg>

              </button>
          </div>  
          </div>
          </div>`
                             ) : (
                                `
                                <div class=" max-w-3xl mx-auto justify-between">
              <div class="-my-4 divide-y divide-gray-200">
                <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                  <p class="w-32 text-lg font-normal text-gray-500 sm:text-right  shrink-0">
                  ${schedule.time}
                  </p>
                  <h3 class="text-lg font-semibold  ">
                  ${schedule.discipline}
                  </h3>
              
              <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
               <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
               </svg>

              </button>
          </div>  
          </div>
          </div>
                                `
                             )};
            
             

            
          `;

          scheduleSection.append(scheduleDiv);
            
            
            
        })
        
       } else if (day === 'Viernes') {
        friday.forEach(schedule => {
            const scheduleDiv = document.createElement('div');
            scheduleDiv.id = schedule.id;
            scheduleDiv.classList.add('max-w-screen-xl',  'border-b-solid', 'border-b-2', 'border-b-black/50', 'flex', 'lg:flex-col',   'px-4', 'py-4', 'mx-auto', 'lg:px-4', 'sm:py-4', 'lg:py-4');
            scheduleDiv.innerHTML = `
              
            ${userLoggedIn?.rol === 'admin'? (
                                 `<div class=" max-w-3xl mx-auto justify-between">
               <div class="-my-4 divide-y divide-gray-200">
                 <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                   <p class="w-32 text-lg font-normal text-gray-500 sm:text-right  shrink-0">
                   ${schedule.time}
                   </p>
                   <h3 class="text-lg font-semibold  ">
                   ${schedule.discipline}
                   </h3>
               </button>
               <button class="schedule-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                   Agregar
               </button>
               <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
 
               </button>
           </div>  
           </div>
           </div>`
                              ) : (
                                 `
                                 <div class=" max-w-3xl mx-auto justify-between">
               <div class="-my-4 divide-y divide-gray-200">
                 <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                   <p class="w-32 text-lg font-normal text-gray-500 sm:text-right  shrink-0">
                   ${schedule.time}
                   </p>
                   <h3 class="text-lg font-semibold  ">
                   ${schedule.discipline}
                   </h3>
               
               <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
 
               </button>
           </div>  
           </div>
           </div>
                                 `
                              )}
             
              
 
             
           `;
          scheduleSection.append(scheduleDiv);
            
            
            
        })
        
       } else if(day === 'Sábado') {
        saturday.forEach(schedule => {
            const scheduleDiv = document.createElement('div');
            scheduleDiv.id = schedule.id;
            scheduleDiv.classList.add('max-w-screen-xl',  'border-b-solid', 'border-b-2', 'border-b-black/50', 'flex', 'lg:flex-col',   'px-4', 'py-4', 'mx-auto', 'lg:px-4', 'sm:py-4', 'lg:py-4');
            scheduleDiv.innerHTML = `
              
            ${userLoggedIn?.rol === 'admin'? (
                                 `<div class=" max-w-3xl mx-auto justify-between">
               <div class="-my-4 divide-y divide-gray-200">
                 <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                   <p class="w-32 text-lg font-normal text-gray-500 sm:text-right  shrink-0">
                   ${schedule.time}
                   </p>
                   <h3 class="text-lg font-semibold  ">
                   ${schedule.discipline}
                   </h3>
               </button>
               <button class="schedule-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                   Agregar
               </button>
               <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
 
               </button>
           </div>  
           </div>
           </div>`
                              ) : (
                                 `
                                 <div class=" max-w-3xl mx-auto justify-between">
               <div class="-my-4 divide-y divide-gray-200">
                 <div class="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center">
                   <p class="w-32 text-lg font-normal text-gray-500 sm:text-right  shrink-0">
                   ${schedule.time}
                   </p>
                   <h3 class="text-lg font-semibold  ">
                   ${schedule.discipline}
                   </h3>
               
               <button class="see-btn inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
 
               </button>
           </div>  
           </div>
           </div>
                                 `
                              )}
             
              
 
             
           `;

          scheduleSection.append(scheduleDiv);
            
            
            
        });
        
       };
    } catch (error) {
       
        console.log('error');
        
    }
    
    })();