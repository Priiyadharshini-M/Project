import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { viewProfile } from '../Store/Actions/action'

const Profile = () =>{
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)  //state from the redux store
    console.log(user)

    useEffect(() => {
        dispatch(viewProfile())
    },[dispatch])

    return(
        <>
        { user.length > 0 ? "Users" : "No users"}
        {user && user.map((user) =>{
            return(
                <div>
                    
                </div>                
            )
        })}
        </>
    )
}
