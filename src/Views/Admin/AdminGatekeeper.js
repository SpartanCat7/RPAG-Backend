import { useEffect, useState } from 'react';

import { auth } from '../../Utils/Firebase';
import { getUser } from '../../Providers/UserProvider';
//import { doc, getDoc } from 'firebase/firestore';

import { Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { CONSTS } from '../../Utils/Constants';
import AdminNavBar from './Components/AdminNavBar';
import './admin.css';

export default function AdminGatekeeper() {
    const [userData, setUserData] = useState();

    /**
     * Constructor
     */
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user != null) {
                updateUserData(user.uid);
            } else {
                setUserData(null);
            }
        });
    }, [])

    /**
     * @param {String} userId 
     */
    function updateUserData(userId) {
        if (userId != null) {
            getUser(userId)
                .then((userSnap) => {
                    if (userSnap.exists()) {
                        var data = userSnap.data();
                        data.userId = userSnap.id;
                        setUserData(data);
                    }
                })
        }
    }

    return (
        <RequireAdminAuth userData={userData}>
            <AdminNavBar userData={userData} />
            <div className='mt-3'>
                <Outlet context={[userData]} />
            </div>
        </RequireAdminAuth>

    )
}

function RequireAdminAuth(props) {

    if (!auth.currentUser) {
        return (
            <div>You must sign in as an Admin to see this</div>
        )
    } else {
        if (props.userData == null) {
            return (
                <div>A moment shas'vre. Recovering user data.</div>
            )
        } else {
            if (props.userData.userId !== auth.currentUser.uid) {
                return (
                    <div>A moment shas'vre. Updating user data.</div>
                )
            } else {
                if (props.userData.type !== CONSTS.DB.USERS.TYPE.ADMIN) {
                    return (
                        <div>{"Sorry, you do not have access to this screen (Admins only)"}</div>
                    )
                } else {
                    return (
                        <div>
                            {props.children}
                        </div>
                    )
                }
            }
        }
    }
}