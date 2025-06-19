import React, { useState } from 'react';
export const Sidebar = () => {
    const sideBarItems = [
       { 
        item:"Home",
        link:'/'
    },
    { 
        item:"Run Test",
        link:'/run-test'
    },
    { 
        item:"Documentation",
        link:'/documentation'
    },
    { 
        item:"Dashboards",
        link:'http://localhost:4000/'
    },
    { 
        item:"Logs",
        link:'/logs'
    },
    ]
    return (
        <div>
            <div className="bg-blue-600 text-white h-screen w-64 fixed left-0 top-0 overflow-y-auto">
                <div className="w-[130px] flex h-20 mt-10 ml-4">
                    <img src="https://res.cloudinary.com/dh8fp23nd/image/upload/v1678303397/main-web/hasura_logo_dark_sclxsr.png" alt="hasuralogo" className="h-full w-full object-contain" />
                </div>

                <div className="px-4">
                    <div className=" flex flex-col">
                        {
                            sideBarItems.map((value, index ) => (
                                <a href={value.link} key={index} className="py-2.5 group rounded-md hover:bg-neutral-200 cursor-pointer">
                                    <div className=" text-neutral-0   group-hover:text-blue-900 px-2 text-hds-m-h4">
                                        {value.item}
                                    </div>
                                </a>

                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};