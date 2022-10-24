import { useEffect, useState } from 'react';

import { auth } from '../../Utils/Firebase';
import { getUser } from '../../Providers/UserProvider';
//import { doc, getDoc } from 'firebase/firestore';

import { Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { CONSTS } from '../../Utils/Constants';
import ModNavBar from './Components/ModNavBar';
import './mod.css';

export default function ModGatekeeper() {
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
        <RequireModAuth userData={userData}>
            <ModNavBar userData={userData} />
            <div className='mt-3'>
                <Outlet context={[userData]} />
            </div>
        </RequireModAuth>

    )
}

function RequireModAuth(props) {

    if (!auth.currentUser) {
        return (
            <div>You must sign in as a Mod to see this</div>
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
                if (props.userData.type !== CONSTS.DB.USERS.TYPE.MOD) {
                    return (
                        <div>{"Sorry, you do not have access to this screen (Mod users only)"}</div>
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