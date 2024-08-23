<template>
    <div>
        <div>
            <div class="flex items-center gap-3 mb-5 ">
                <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer"><nuxt-link to="/carrier">CARRIER</nuxt-link></h1>
                <img src="@/static/svg/right-arrow.svg" alt="">
                <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">ADD CARRIER</p>
            </div>
            <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="addUser">
                        <div class="w-[65%]">
                            <div class="grid grid-cols-2">
                                <div>
                                <label for="Company name" class="block mb-2 text-sm font-normal text-[#4B4B4B]">Company name</label>
                                <input type="text" name="CompanyName" id="CompanyName" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]" placeholder="Your company name">
                            </div>
                            <div>
                                <label for="ContactName" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Contact name</label>
                                <input type="text" name="ContactName" id="ContactName" placeholder="Your contact name" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]">
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Email Address</label>
                                <input type="email" name="email" id="email" placeholder="Your Email Address" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]">
                            </div>
                            <div>
                                <label for="ContactNo" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Contact No.</label>
                                <label class="xl:w-[382px] relative flex cursor-pointer">
                                    <div class="flex justify-between">
                                        <svg width="24" class="absolute ml-3 mb-3 mr-4 top-3" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
                                        <path fill="#ED2939" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"></path>
                                        <path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"></path>
                                        <path fill="#EEE" d="M12 5h12v26H12z"></path>
                                    </svg>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute sm:right-3 right-2 top-3 cursor-pointer">
                                        <path d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z" fill="#1E1E1E" />
                                    </svg>
                                    <span class="absolute left-12 mb-3 mr-4 top-3 text-[#1E1E1E] font-normal text-base">+33</span>
                                    <div class="border-r border-gray-400 h-[40%] absolute left-20 top-4"></div>
                                    <input type="number" name="ContactNo" id="ContactNo" placeholder="Your Contact No." class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[12px] bg-white pl-24 focus:outline-none mb-3">
                                    </div>
                                    <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                </label>
                            </div>
                            <div>
                                <label for="COPIARFCForm" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-3">SCAC</label>
                                <label class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150">
                                    <div class="flex justify-between">
                                        <p class="text-sm text-[#686868] font-normal">Choose file to upload</p>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-2">
                                            <g clip-path="url(#clip0_1879_1065)">
                                                <path d="M16.6245 4.6136L13.7212 1.7086C13.1806 1.16538 12.5377 0.734706 11.8297 0.441479C11.1216 0.148253 10.3625 -0.00170909 9.59616 0.000263348H5.83366C4.729 0.00158656 3.66996 0.440998 2.88884 1.22211C2.10773 2.00323 1.66832 3.06227 1.66699 4.16693V15.8336C1.66832 16.9383 2.10773 17.9973 2.88884 18.7784C3.66996 19.5595 4.729 19.9989 5.83366 20.0003H14.167C15.2717 19.9989 16.3307 19.5595 17.1118 18.7784C17.8929 17.9973 18.3323 16.9383 18.3337 15.8336V8.73776C18.3357 7.97145 18.1857 7.21234 17.8923 6.50441C17.599 5.79648 17.168 5.1538 16.6245 4.6136ZM15.4462 5.79193C15.7006 6.05372 15.9195 6.34792 16.097 6.66693H12.5003C12.2793 6.66693 12.0674 6.57913 11.9111 6.42285C11.7548 6.26657 11.667 6.05461 11.667 5.8336V2.23693C11.9861 2.41437 12.2806 2.6329 12.5428 2.88693L15.4462 5.79193ZM16.667 15.8336C16.667 16.4966 16.4036 17.1325 15.9348 17.6014C15.4659 18.0702 14.83 18.3336 14.167 18.3336H5.83366C5.17062 18.3336 4.53473 18.0702 4.06589 17.6014C3.59705 17.1325 3.33366 16.4966 3.33366 15.8336V4.16693C3.33366 3.50389 3.59705 2.868 4.06589 2.39916C4.53473 1.93032 5.17062 1.66693 5.83366 1.66693H9.59616C9.73283 1.66693 9.86532 1.6936 10.0003 1.7061V5.8336C10.0003 6.49664 10.2637 7.13252 10.7326 7.60136C11.2014 8.0702 11.8373 8.3336 12.5003 8.3336H16.6278C16.6403 8.4686 16.667 8.60026 16.667 8.73776V15.8336Z" fill="#1E1E1E" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1879_1065">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                </label>
                                <p class="text-[#989898] font-normal text-[12px] mt-1">Type should be PDF, DOC, JPG, PNG*</p>
                            </div>
                            <div>
                                <label for="COPIARFCForm" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-3">CAAT</label>
                                <label class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150">
                                    <div class="flex justify-between">
                                        <p class="text-sm text-[#686868] font-normal">Choose file to upload</p>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-2">
                                            <g clip-path="url(#clip0_1879_1065)">
                                                <path d="M16.6245 4.6136L13.7212 1.7086C13.1806 1.16538 12.5377 0.734706 11.8297 0.441479C11.1216 0.148253 10.3625 -0.00170909 9.59616 0.000263348H5.83366C4.729 0.00158656 3.66996 0.440998 2.88884 1.22211C2.10773 2.00323 1.66832 3.06227 1.66699 4.16693V15.8336C1.66832 16.9383 2.10773 17.9973 2.88884 18.7784C3.66996 19.5595 4.729 19.9989 5.83366 20.0003H14.167C15.2717 19.9989 16.3307 19.5595 17.1118 18.7784C17.8929 17.9973 18.3323 16.9383 18.3337 15.8336V8.73776C18.3357 7.97145 18.1857 7.21234 17.8923 6.50441C17.599 5.79648 17.168 5.1538 16.6245 4.6136ZM15.4462 5.79193C15.7006 6.05372 15.9195 6.34792 16.097 6.66693H12.5003C12.2793 6.66693 12.0674 6.57913 11.9111 6.42285C11.7548 6.26657 11.667 6.05461 11.667 5.8336V2.23693C11.9861 2.41437 12.2806 2.6329 12.5428 2.88693L15.4462 5.79193ZM16.667 15.8336C16.667 16.4966 16.4036 17.1325 15.9348 17.6014C15.4659 18.0702 14.83 18.3336 14.167 18.3336H5.83366C5.17062 18.3336 4.53473 18.0702 4.06589 17.6014C3.59705 17.1325 3.33366 16.4966 3.33366 15.8336V4.16693C3.33366 3.50389 3.59705 2.868 4.06589 2.39916C4.53473 1.93032 5.17062 1.66693 5.83366 1.66693H9.59616C9.73283 1.66693 9.86532 1.6936 10.0003 1.7061V5.8336C10.0003 6.49664 10.2637 7.13252 10.7326 7.60136C11.2014 8.0702 11.8373 8.3336 12.5003 8.3336H16.6278C16.6403 8.4686 16.667 8.60026 16.667 8.73776V15.8336Z" fill="#1E1E1E" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1879_1065">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                </label>
                                <p class="text-[#989898] font-normal text-[12px] mt-1">Type should be PDF, DOC, JPG, PNG*</p>
                            </div>
                            <div>
                                <label for="COPIARFCForm" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-3">Insurance Policy</label>
                                <label class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150">
                                    <div class="flex justify-between">
                                        <p class="text-sm text-[#686868] font-normal">Choose file to upload</p>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-2">
                                            <g clip-path="url(#clip0_1879_1065)">
                                                <path d="M16.6245 4.6136L13.7212 1.7086C13.1806 1.16538 12.5377 0.734706 11.8297 0.441479C11.1216 0.148253 10.3625 -0.00170909 9.59616 0.000263348H5.83366C4.729 0.00158656 3.66996 0.440998 2.88884 1.22211C2.10773 2.00323 1.66832 3.06227 1.66699 4.16693V15.8336C1.66832 16.9383 2.10773 17.9973 2.88884 18.7784C3.66996 19.5595 4.729 19.9989 5.83366 20.0003H14.167C15.2717 19.9989 16.3307 19.5595 17.1118 18.7784C17.8929 17.9973 18.3323 16.9383 18.3337 15.8336V8.73776C18.3357 7.97145 18.1857 7.21234 17.8923 6.50441C17.599 5.79648 17.168 5.1538 16.6245 4.6136ZM15.4462 5.79193C15.7006 6.05372 15.9195 6.34792 16.097 6.66693H12.5003C12.2793 6.66693 12.0674 6.57913 11.9111 6.42285C11.7548 6.26657 11.667 6.05461 11.667 5.8336V2.23693C11.9861 2.41437 12.2806 2.6329 12.5428 2.88693L15.4462 5.79193ZM16.667 15.8336C16.667 16.4966 16.4036 17.1325 15.9348 17.6014C15.4659 18.0702 14.83 18.3336 14.167 18.3336H5.83366C5.17062 18.3336 4.53473 18.0702 4.06589 17.6014C3.59705 17.1325 3.33366 16.4966 3.33366 15.8336V4.16693C3.33366 3.50389 3.59705 2.868 4.06589 2.39916C4.53473 1.93032 5.17062 1.66693 5.83366 1.66693H9.59616C9.73283 1.66693 9.86532 1.6936 10.0003 1.7061V5.8336C10.0003 6.49664 10.2637 7.13252 10.7326 7.60136C11.2014 8.0702 11.8373 8.3336 12.5003 8.3336H16.6278C16.6403 8.4686 16.667 8.60026 16.667 8.73776V15.8336Z" fill="#1E1E1E" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1879_1065">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                </label>
                                <p class="text-[#989898] font-normal text-[12px] mt-1">Type should be PDF, DOC, JPG, PNG*</p>
                            </div>
                            <div>
                                <label for="COPIARFCForm" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-3">OEA</label>
                                <label class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150">
                                    <div class="flex justify-between">
                                        <p class="text-sm text-[#686868] font-normal">Choose file to upload</p>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-2">
                                            <g clip-path="url(#clip0_1879_1065)">
                                                <path d="M16.6245 4.6136L13.7212 1.7086C13.1806 1.16538 12.5377 0.734706 11.8297 0.441479C11.1216 0.148253 10.3625 -0.00170909 9.59616 0.000263348H5.83366C4.729 0.00158656 3.66996 0.440998 2.88884 1.22211C2.10773 2.00323 1.66832 3.06227 1.66699 4.16693V15.8336C1.66832 16.9383 2.10773 17.9973 2.88884 18.7784C3.66996 19.5595 4.729 19.9989 5.83366 20.0003H14.167C15.2717 19.9989 16.3307 19.5595 17.1118 18.7784C17.8929 17.9973 18.3323 16.9383 18.3337 15.8336V8.73776C18.3357 7.97145 18.1857 7.21234 17.8923 6.50441C17.599 5.79648 17.168 5.1538 16.6245 4.6136ZM15.4462 5.79193C15.7006 6.05372 15.9195 6.34792 16.097 6.66693H12.5003C12.2793 6.66693 12.0674 6.57913 11.9111 6.42285C11.7548 6.26657 11.667 6.05461 11.667 5.8336V2.23693C11.9861 2.41437 12.2806 2.6329 12.5428 2.88693L15.4462 5.79193ZM16.667 15.8336C16.667 16.4966 16.4036 17.1325 15.9348 17.6014C15.4659 18.0702 14.83 18.3336 14.167 18.3336H5.83366C5.17062 18.3336 4.53473 18.0702 4.06589 17.6014C3.59705 17.1325 3.33366 16.4966 3.33366 15.8336V4.16693C3.33366 3.50389 3.59705 2.868 4.06589 2.39916C4.53473 1.93032 5.17062 1.66693 5.83366 1.66693H9.59616C9.73283 1.66693 9.86532 1.6936 10.0003 1.7061V5.8336C10.0003 6.49664 10.2637 7.13252 10.7326 7.60136C11.2014 8.0702 11.8373 8.3336 12.5003 8.3336H16.6278C16.6403 8.4686 16.667 8.60026 16.667 8.73776V15.8336Z" fill="#1E1E1E" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1879_1065">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                </label>
                                <p class="text-[#989898] font-normal text-[12px] mt-1">Type should be PDF, DOC, JPG, PNG*</p>
                            </div>
                            <div>
                                <label for="COPIARFCForm" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-3">CTPAT</label>
                                <label class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150">
                                    <div class="flex justify-between">
                                        <p class="text-sm text-[#686868] font-normal">Choose file to upload</p>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-2">
                                            <g clip-path="url(#clip0_1879_1065)">
                                                <path d="M16.6245 4.6136L13.7212 1.7086C13.1806 1.16538 12.5377 0.734706 11.8297 0.441479C11.1216 0.148253 10.3625 -0.00170909 9.59616 0.000263348H5.83366C4.729 0.00158656 3.66996 0.440998 2.88884 1.22211C2.10773 2.00323 1.66832 3.06227 1.66699 4.16693V15.8336C1.66832 16.9383 2.10773 17.9973 2.88884 18.7784C3.66996 19.5595 4.729 19.9989 5.83366 20.0003H14.167C15.2717 19.9989 16.3307 19.5595 17.1118 18.7784C17.8929 17.9973 18.3323 16.9383 18.3337 15.8336V8.73776C18.3357 7.97145 18.1857 7.21234 17.8923 6.50441C17.599 5.79648 17.168 5.1538 16.6245 4.6136ZM15.4462 5.79193C15.7006 6.05372 15.9195 6.34792 16.097 6.66693H12.5003C12.2793 6.66693 12.0674 6.57913 11.9111 6.42285C11.7548 6.26657 11.667 6.05461 11.667 5.8336V2.23693C11.9861 2.41437 12.2806 2.6329 12.5428 2.88693L15.4462 5.79193ZM16.667 15.8336C16.667 16.4966 16.4036 17.1325 15.9348 17.6014C15.4659 18.0702 14.83 18.3336 14.167 18.3336H5.83366C5.17062 18.3336 4.53473 18.0702 4.06589 17.6014C3.59705 17.1325 3.33366 16.4966 3.33366 15.8336V4.16693C3.33366 3.50389 3.59705 2.868 4.06589 2.39916C4.53473 1.93032 5.17062 1.66693 5.83366 1.66693H9.59616C9.73283 1.66693 9.86532 1.6936 10.0003 1.7061V5.8336C10.0003 6.49664 10.2637 7.13252 10.7326 7.60136C11.2014 8.0702 11.8373 8.3336 12.5003 8.3336H16.6278C16.6403 8.4686 16.667 8.60026 16.667 8.73776V15.8336Z" fill="#1E1E1E" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1879_1065">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                </label>
                                <p class="text-[#989898] font-normal text-[12px] mt-1">Type should be PDF, DOC, JPG, PNG*</p>
                            </div>
                            <div class="mt-3">
                                <label for="COPIARFCForm" class="block mb-2 text-sm font-normal text-[#1E1E1E] mt-2">Company Formation</label>
                                <Dropdown :items="trueProfitSelect" :selectedLabel="selectedLabel" @getValue="getValue" />
                            </div>
                            </div>
                            <div v-if="selectedLabel === 'USA'">
                               <div class="grid grid-cols-2">
                                <div>
                                    <label for="COPIARFCForm" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">W9 Form</label>
                                    <label class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150">
                                        <div class="flex justify-between">
                                            <p class="text-sm text-[#686868] font-normal">Choose file to upload</p>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-2">
                                                <g clip-path="url(#clip0_1879_1065)">
                                                    <path d="M16.6245 4.6136L13.7212 1.7086C13.1806 1.16538 12.5377 0.734706 11.8297 0.441479C11.1216 0.148253 10.3625 -0.00170909 9.59616 0.000263348H5.83366C4.729 0.00158656 3.66996 0.440998 2.88884 1.22211C2.10773 2.00323 1.66832 3.06227 1.66699 4.16693V15.8336C1.66832 16.9383 2.10773 17.9973 2.88884 18.7784C3.66996 19.5595 4.729 19.9989 5.83366 20.0003H14.167C15.2717 19.9989 16.3307 19.5595 17.1118 18.7784C17.8929 17.9973 18.3323 16.9383 18.3337 15.8336V8.73776C18.3357 7.97145 18.1857 7.21234 17.8923 6.50441C17.599 5.79648 17.168 5.1538 16.6245 4.6136ZM15.4462 5.79193C15.7006 6.05372 15.9195 6.34792 16.097 6.66693H12.5003C12.2793 6.66693 12.0674 6.57913 11.9111 6.42285C11.7548 6.26657 11.667 6.05461 11.667 5.8336V2.23693C11.9861 2.41437 12.2806 2.6329 12.5428 2.88693L15.4462 5.79193ZM16.667 15.8336C16.667 16.4966 16.4036 17.1325 15.9348 17.6014C15.4659 18.0702 14.83 18.3336 14.167 18.3336H5.83366C5.17062 18.3336 4.53473 18.0702 4.06589 17.6014C3.59705 17.1325 3.33366 16.4966 3.33366 15.8336V4.16693C3.33366 3.50389 3.59705 2.868 4.06589 2.39916C4.53473 1.93032 5.17062 1.66693 5.83366 1.66693H9.59616C9.73283 1.66693 9.86532 1.6936 10.0003 1.7061V5.8336C10.0003 6.49664 10.2637 7.13252 10.7326 7.60136C11.2014 8.0702 11.8373 8.3336 12.5003 8.3336H16.6278C16.6403 8.4686 16.667 8.60026 16.667 8.73776V15.8336Z" fill="#1E1E1E" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1879_1065">
                                                        <rect width="20" height="20" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                    </label>
                                    <p class="text-[#989898] font-normal text-[12px] mt-1">Type should be PDF, DOC, JPG, PNG*</p>
                                </div>
                                <div>
                                    <label for="COPIARFCForm" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-4">Utility Bill</label>
                                    <label class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150">
                                        <div class="flex justify-between">
                                            <p class="text-sm text-[#686868] font-normal">Choose file to upload</p>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-2">
                                                <g clip-path="url(#clip0_1879_1065)">
                                                    <path d="M16.6245 4.6136L13.7212 1.7086C13.1806 1.16538 12.5377 0.734706 11.8297 0.441479C11.1216 0.148253 10.3625 -0.00170909 9.59616 0.000263348H5.83366C4.729 0.00158656 3.66996 0.440998 2.88884 1.22211C2.10773 2.00323 1.66832 3.06227 1.66699 4.16693V15.8336C1.66832 16.9383 2.10773 17.9973 2.88884 18.7784C3.66996 19.5595 4.729 19.9989 5.83366 20.0003H14.167C15.2717 19.9989 16.3307 19.5595 17.1118 18.7784C17.8929 17.9973 18.3323 16.9383 18.3337 15.8336V8.73776C18.3357 7.97145 18.1857 7.21234 17.8923 6.50441C17.599 5.79648 17.168 5.1538 16.6245 4.6136ZM15.4462 5.79193C15.7006 6.05372 15.9195 6.34792 16.097 6.66693H12.5003C12.2793 6.66693 12.0674 6.57913 11.9111 6.42285C11.7548 6.26657 11.667 6.05461 11.667 5.8336V2.23693C11.9861 2.41437 12.2806 2.6329 12.5428 2.88693L15.4462 5.79193ZM16.667 15.8336C16.667 16.4966 16.4036 17.1325 15.9348 17.6014C15.4659 18.0702 14.83 18.3336 14.167 18.3336H5.83366C5.17062 18.3336 4.53473 18.0702 4.06589 17.6014C3.59705 17.1325 3.33366 16.4966 3.33366 15.8336V4.16693C3.33366 3.50389 3.59705 2.868 4.06589 2.39916C4.53473 1.93032 5.17062 1.66693 5.83366 1.66693H9.59616C9.73283 1.66693 9.86532 1.6936 10.0003 1.7061V5.8336C10.0003 6.49664 10.2637 7.13252 10.7326 7.60136C11.2014 8.0702 11.8373 8.3336 12.5003 8.3336H16.6278C16.6403 8.4686 16.667 8.60026 16.667 8.73776V15.8336Z" fill="#1E1E1E" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1879_1065">
                                                        <rect width="20" height="20" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                    </label>
                                    <p class="text-[#989898] font-normal text-[12px] mt-1">Type should be PDF, DOC, JPG, PNG*</p>
                                </div>
                               </div>
                                <div class="grid grid-cols-2">
                                    <div>
                                    <h1 class="text-[#1E1E1E] font-medium text-base	mt-6">Commercial Reference 1</h1>
                                    <div>
                                        <label for="Company name" class="block mb-2 mt-5 text-sm font-normal text-[#4B4B4B]">Company name</label>
                                        <input type="text" name="CompanyName" id="CompanyName" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]" placeholder="Your company name">
                                    </div>
                                    <div>
                                        <label for="ContactName" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Contact name</label>
                                        <input type="text" name="ContactName" id="ContactName" placeholder="Your contact name" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]">
                                    </div>
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Email Address</label>
                                        <input type="email" name="email" id="email" placeholder="Your Email Address" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]">
                                    </div>
                                    <div>
                                <label for="ContactNo" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Contact No.</label>
                                <label class="xl:w-[382px] relative flex cursor-pointer">
                                    <div class="flex justify-between">
                                        <svg width="24" class="absolute ml-3 mb-3 mr-4 top-3" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
                                        <path fill="#ED2939" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"></path>
                                        <path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"></path>
                                        <path fill="#EEE" d="M12 5h12v26H12z"></path>
                                    </svg>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute sm:right-3 right-2 top-3 cursor-pointer">
                                        <path d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z" fill="#1E1E1E" />
                                    </svg>
                                    <span class="absolute left-12 mb-3 mr-4 top-3 text-[#1E1E1E] font-normal text-base">+33</span>
                                    <div class="border-r border-gray-400 h-[40%] absolute left-20 top-4"></div>
                                    <input type="number" name="ContactNo" id="ContactNo" placeholder="Your Contact No." class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[12px] bg-white pl-24 focus:outline-none mb-3">
                                    </div>
                                    <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                </label>
                            </div>
                                </div>
                                <div>
                                    <h1 class="text-[#1E1E1E] font-medium text-base	mt-6">Commercial Reference 2</h1>
                                    <div>
                                        <label for="Company name" class="block mb-2 mt-5 text-sm font-normal text-[#4B4B4B]">Company name</label>
                                        <input type="text" name="CompanyName" id="CompanyName" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]" placeholder="Your company name">
                                    </div>
                                    <div>
                                        <label for="ContactName" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Contact name</label>
                                        <input type="text" name="ContactName" id="ContactName" placeholder="Your contact name" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]">
                                    </div>
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Email Address</label>
                                        <input type="email" name="email" id="email" placeholder="Your Email Address" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]">
                                    </div>
                                    <div>
                                <label for="ContactNo" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Contact No.</label>
                                <label class="xl:w-[382px] relative flex cursor-pointer">
                                    <div class="flex justify-between">
                                        <svg width="24" class="absolute ml-3 mb-3 mr-4 top-3" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
                                        <path fill="#ED2939" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"></path>
                                        <path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"></path>
                                        <path fill="#EEE" d="M12 5h12v26H12z"></path>
                                    </svg>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute sm:right-3 right-2 top-3 cursor-pointer">
                                        <path d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z" fill="#1E1E1E" />
                                    </svg>
                                    <span class="absolute left-12 mb-3 mr-4 top-3 text-[#1E1E1E] font-normal text-base">+33</span>
                                    <div class="border-r border-gray-400 h-[40%] absolute left-20 top-4"></div>
                                    <input type="number" name="ContactNo" id="ContactNo" placeholder="Your Contact No." class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[12px] bg-white pl-24 focus:outline-none mb-3">
                                    </div>
                                    <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                </label>
                            </div>
                                </div>
                                </div>
                            </div>

                            <div v-if="selectedLabel === 'MEXICO'">
                                <div class="grid grid-cols-2">
                                    <div>
                                    <label for="COPIARFCForm" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">COPIA RFC Form</label>
                                    <label class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150">
                                        <div class="flex justify-between">
                                            <p class="text-sm text-[#686868] font-normal">Choose file to upload</p>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-2">
                                            <g clip-path="url(#clip0_1879_1065)">
                                                <path d="M16.6245 4.6136L13.7212 1.7086C13.1806 1.16538 12.5377 0.734706 11.8297 0.441479C11.1216 0.148253 10.3625 -0.00170909 9.59616 0.000263348H5.83366C4.729 0.00158656 3.66996 0.440998 2.88884 1.22211C2.10773 2.00323 1.66832 3.06227 1.66699 4.16693V15.8336C1.66832 16.9383 2.10773 17.9973 2.88884 18.7784C3.66996 19.5595 4.729 19.9989 5.83366 20.0003H14.167C15.2717 19.9989 16.3307 19.5595 17.1118 18.7784C17.8929 17.9973 18.3323 16.9383 18.3337 15.8336V8.73776C18.3357 7.97145 18.1857 7.21234 17.8923 6.50441C17.599 5.79648 17.168 5.1538 16.6245 4.6136ZM15.4462 5.79193C15.7006 6.05372 15.9195 6.34792 16.097 6.66693H12.5003C12.2793 6.66693 12.0674 6.57913 11.9111 6.42285C11.7548 6.26657 11.667 6.05461 11.667 5.8336V2.23693C11.9861 2.41437 12.2806 2.6329 12.5428 2.88693L15.4462 5.79193ZM16.667 15.8336C16.667 16.4966 16.4036 17.1325 15.9348 17.6014C15.4659 18.0702 14.83 18.3336 14.167 18.3336H5.83366C5.17062 18.3336 4.53473 18.0702 4.06589 17.6014C3.59705 17.1325 3.33366 16.4966 3.33366 15.8336V4.16693C3.33366 3.50389 3.59705 2.868 4.06589 2.39916C4.53473 1.93032 5.17062 1.66693 5.83366 1.66693H9.59616C9.73283 1.66693 9.86532 1.6936 10.0003 1.7061V5.8336C10.0003 6.49664 10.2637 7.13252 10.7326 7.60136C11.2014 8.0702 11.8373 8.3336 12.5003 8.3336H16.6278C16.6403 8.4686 16.667 8.60026 16.667 8.73776V15.8336Z" fill="#1E1E1E" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1879_1065">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        </div>
                                        <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                    </label>
                                    <p class="text-[#989898] font-normal text-[12px] mt-1">Type should be PDF, DOC, JPG, PNG*</p>
                                </div>
                                <div>
                                    <label for="COPIARFCForm" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Constance of Fiscal Situation</label>
                                    <label class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150">
                                        <div class="flex justify-between">
                                            <p class="text-sm text-[#686868] font-normal">Choose file to upload</p>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-2">
                                            <g clip-path="url(#clip0_1879_1065)">
                                                <path d="M16.6245 4.6136L13.7212 1.7086C13.1806 1.16538 12.5377 0.734706 11.8297 0.441479C11.1216 0.148253 10.3625 -0.00170909 9.59616 0.000263348H5.83366C4.729 0.00158656 3.66996 0.440998 2.88884 1.22211C2.10773 2.00323 1.66832 3.06227 1.66699 4.16693V15.8336C1.66832 16.9383 2.10773 17.9973 2.88884 18.7784C3.66996 19.5595 4.729 19.9989 5.83366 20.0003H14.167C15.2717 19.9989 16.3307 19.5595 17.1118 18.7784C17.8929 17.9973 18.3323 16.9383 18.3337 15.8336V8.73776C18.3357 7.97145 18.1857 7.21234 17.8923 6.50441C17.599 5.79648 17.168 5.1538 16.6245 4.6136ZM15.4462 5.79193C15.7006 6.05372 15.9195 6.34792 16.097 6.66693H12.5003C12.2793 6.66693 12.0674 6.57913 11.9111 6.42285C11.7548 6.26657 11.667 6.05461 11.667 5.8336V2.23693C11.9861 2.41437 12.2806 2.6329 12.5428 2.88693L15.4462 5.79193ZM16.667 15.8336C16.667 16.4966 16.4036 17.1325 15.9348 17.6014C15.4659 18.0702 14.83 18.3336 14.167 18.3336H5.83366C5.17062 18.3336 4.53473 18.0702 4.06589 17.6014C3.59705 17.1325 3.33366 16.4966 3.33366 15.8336V4.16693C3.33366 3.50389 3.59705 2.868 4.06589 2.39916C4.53473 1.93032 5.17062 1.66693 5.83366 1.66693H9.59616C9.73283 1.66693 9.86532 1.6936 10.0003 1.7061V5.8336C10.0003 6.49664 10.2637 7.13252 10.7326 7.60136C11.2014 8.0702 11.8373 8.3336 12.5003 8.3336H16.6278C16.6403 8.4686 16.667 8.60026 16.667 8.73776V15.8336Z" fill="#1E1E1E" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1879_1065">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        </div>
                                        <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                    </label>
                                    <p class="text-[#989898] font-normal text-[12px] mt-1">Type should be PDF, DOC, JPG, PNG*</p>
                                </div>
                                <div>
                                    <label for="COPIARFCForm" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Proof of Favorable</label>
                                    <label class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150">
                                        <div class="flex justify-between">
                                            <p class="text-sm text-[#686868] font-normal">Choose file to upload</p>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-2">
                                            <g clip-path="url(#clip0_1879_1065)">
                                                <path d="M16.6245 4.6136L13.7212 1.7086C13.1806 1.16538 12.5377 0.734706 11.8297 0.441479C11.1216 0.148253 10.3625 -0.00170909 9.59616 0.000263348H5.83366C4.729 0.00158656 3.66996 0.440998 2.88884 1.22211C2.10773 2.00323 1.66832 3.06227 1.66699 4.16693V15.8336C1.66832 16.9383 2.10773 17.9973 2.88884 18.7784C3.66996 19.5595 4.729 19.9989 5.83366 20.0003H14.167C15.2717 19.9989 16.3307 19.5595 17.1118 18.7784C17.8929 17.9973 18.3323 16.9383 18.3337 15.8336V8.73776C18.3357 7.97145 18.1857 7.21234 17.8923 6.50441C17.599 5.79648 17.168 5.1538 16.6245 4.6136ZM15.4462 5.79193C15.7006 6.05372 15.9195 6.34792 16.097 6.66693H12.5003C12.2793 6.66693 12.0674 6.57913 11.9111 6.42285C11.7548 6.26657 11.667 6.05461 11.667 5.8336V2.23693C11.9861 2.41437 12.2806 2.6329 12.5428 2.88693L15.4462 5.79193ZM16.667 15.8336C16.667 16.4966 16.4036 17.1325 15.9348 17.6014C15.4659 18.0702 14.83 18.3336 14.167 18.3336H5.83366C5.17062 18.3336 4.53473 18.0702 4.06589 17.6014C3.59705 17.1325 3.33366 16.4966 3.33366 15.8336V4.16693C3.33366 3.50389 3.59705 2.868 4.06589 2.39916C4.53473 1.93032 5.17062 1.66693 5.83366 1.66693H9.59616C9.73283 1.66693 9.86532 1.6936 10.0003 1.7061V5.8336C10.0003 6.49664 10.2637 7.13252 10.7326 7.60136C11.2014 8.0702 11.8373 8.3336 12.5003 8.3336H16.6278C16.6403 8.4686 16.667 8.60026 16.667 8.73776V15.8336Z" fill="#1E1E1E" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1879_1065">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        </div>
                                        <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                    </label>
                                    <p class="text-[#989898] font-normal text-[12px] mt-1">Type should be PDF, DOC, JPG, PNG*</p>
                                </div>
                                <div>
                                    <label for="COPIARFCForm" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Proof of Address</label>
                                    <label class="xl:w-[382px] relative flex w-full max-w-md px-6 py-[17px] border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all duration-150">
                                        <div class="flex justify-between">
                                            <p class="text-sm text-[#686868] font-normal">Choose file to upload</p>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-2">
                                            <g clip-path="url(#clip0_1879_1065)">
                                                <path d="M16.6245 4.6136L13.7212 1.7086C13.1806 1.16538 12.5377 0.734706 11.8297 0.441479C11.1216 0.148253 10.3625 -0.00170909 9.59616 0.000263348H5.83366C4.729 0.00158656 3.66996 0.440998 2.88884 1.22211C2.10773 2.00323 1.66832 3.06227 1.66699 4.16693V15.8336C1.66832 16.9383 2.10773 17.9973 2.88884 18.7784C3.66996 19.5595 4.729 19.9989 5.83366 20.0003H14.167C15.2717 19.9989 16.3307 19.5595 17.1118 18.7784C17.8929 17.9973 18.3323 16.9383 18.3337 15.8336V8.73776C18.3357 7.97145 18.1857 7.21234 17.8923 6.50441C17.599 5.79648 17.168 5.1538 16.6245 4.6136ZM15.4462 5.79193C15.7006 6.05372 15.9195 6.34792 16.097 6.66693H12.5003C12.2793 6.66693 12.0674 6.57913 11.9111 6.42285C11.7548 6.26657 11.667 6.05461 11.667 5.8336V2.23693C11.9861 2.41437 12.2806 2.6329 12.5428 2.88693L15.4462 5.79193ZM16.667 15.8336C16.667 16.4966 16.4036 17.1325 15.9348 17.6014C15.4659 18.0702 14.83 18.3336 14.167 18.3336H5.83366C5.17062 18.3336 4.53473 18.0702 4.06589 17.6014C3.59705 17.1325 3.33366 16.4966 3.33366 15.8336V4.16693C3.33366 3.50389 3.59705 2.868 4.06589 2.39916C4.53473 1.93032 5.17062 1.66693 5.83366 1.66693H9.59616C9.73283 1.66693 9.86532 1.6936 10.0003 1.7061V5.8336C10.0003 6.49664 10.2637 7.13252 10.7326 7.60136C11.2014 8.0702 11.8373 8.3336 12.5003 8.3336H16.6278C16.6403 8.4686 16.667 8.60026 16.667 8.73776V15.8336Z" fill="#1E1E1E" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1879_1065">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        </div>
                                        <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                    </label>
                                    <p class="text-[#989898] font-normal text-[12px] mt-1">Type should be PDF, DOC, JPG, PNG*</p>
                                </div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div>
                                    <h1 class="text-[#1E1E1E] font-medium text-base	mt-6">Commercial Reference 1</h1>
                                    <div>
                                        <label for="Company name" class="block mb-2 mt-5 text-sm font-normal text-[#4B4B4B]">Company name</label>
                                        <input type="text" name="CompanyName" id="CompanyName" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]" placeholder="Your company name">
                                    </div>
                                    <div>
                                        <label for="ContactName" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Contact name</label>
                                        <input type="text" name="ContactName" id="ContactName" placeholder="Your contact name" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]">
                                    </div>
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Email Address</label>
                                        <input type="email" name="email" id="email" placeholder="Your Email Address" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]">
                                    </div>
                                    <div>
                                <label for="ContactNo" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Contact No.</label>
                                <label class="xl:w-[382px] relative flex cursor-pointer">
                                    <div class="flex justify-between">
                                        <svg width="24" class="absolute ml-3 mb-3 mr-4 top-3" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
                                        <path fill="#ED2939" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"></path>
                                        <path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"></path>
                                        <path fill="#EEE" d="M12 5h12v26H12z"></path>
                                    </svg>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute sm:right-3 right-2 top-3 cursor-pointer">
                                        <path d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z" fill="#1E1E1E" />
                                    </svg>
                                    <span class="absolute left-12 mb-3 mr-4 top-3 text-[#1E1E1E] font-normal text-base">+33</span>
                                    <div class="border-r border-gray-400 h-[40%] absolute left-20 top-4"></div>
                                    <input type="number" name="ContactNo" id="ContactNo" placeholder="Your Contact No." class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[12px] bg-white pl-24 focus:outline-none mb-3">
                                    </div>
                                    <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                </label>
                            </div>
                                </div>
                                <div>
                                    <h1 class="text-[#1E1E1E] font-medium text-base	mt-6">Commercial Reference 2</h1>
                                    <div>
                                        <label for="Company name" class="block mb-2 mt-5 text-sm font-normal text-[#4B4B4B]">Company name</label>
                                        <input type="text" name="CompanyName" id="CompanyName" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]" placeholder="Your company name">
                                    </div>
                                    <div>
                                        <label for="ContactName" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Contact name</label>
                                        <input type="text" name="ContactName" id="ContactName" placeholder="Your contact name" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]">
                                    </div>
                                    <div>
                                        <label for="email" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Email Address</label>
                                        <input type="email" name="email" id="email" placeholder="Your Email Address" class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]">
                                    </div>
                                    <div>
                                <label for="ContactNo" class="block mb-2 text-sm font-normal text-[#4B4B4B] mt-2">Contact No.</label>
                                <label class="xl:w-[382px] relative flex cursor-pointer">
                                    <div class="flex justify-between">
                                        <svg width="24" class="absolute ml-3 mb-3 mr-4 top-3" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet">
                                        <path fill="#ED2939" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"></path>
                                        <path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"></path>
                                        <path fill="#EEE" d="M12 5h12v26H12z"></path>
                                    </svg>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute sm:right-3 right-2 top-3 cursor-pointer">
                                        <path d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z" fill="#1E1E1E" />
                                    </svg>
                                    <span class="absolute left-12 mb-3 mr-4 top-3 text-[#1E1E1E] font-normal text-base">+33</span>
                                    <div class="border-r border-gray-400 h-[40%] absolute left-20 top-4"></div>
                                    <input type="number" name="ContactNo" id="ContactNo" placeholder="Your Contact No." class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[12px] bg-white pl-24 focus:outline-none mb-3">
                                    </div>
                                    <input type="file" class="absolute inset-0 opacity-0 cursor-pointer py-1" @change="handleFileChange" />
                                </label>
                            </div>
                                </div>
                                </div>
                            </div>
                            <div class="flex justify-center">
                                <button type="submit" class=" text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-5 mr-40" @click="addCarrier">Add Carrier</button>
                            </div>
                        </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    layout:"dashboard",
    data() {
        return {
            trueProfitSelect: [{
                    label: 'USA'
                },
                {
                    label: 'MEXICO'
                },
            ],
            selectedLabel: 'Select option',

        }
    },
    methods: {
        getValue(item) {
            this.selectedLabel = item.label;
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                console.log('Selected file:', file.name);
            }
        },
        addCarrier(){
            console.log('clicked');
        }
    },
}
</script>
