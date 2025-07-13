import { useSearchUser } from '../../../customHooks/useSearchUser';
import { PersonItem } from './PersonItem';

export const AddOfficerDuty = () => {
    const { users, setUsers, input, setInput, } = useSearchUser();


    return (
        <div>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />

            {users ? users.map(u => <PersonItem key={u.id} user={u}></PersonItem>)
                :
                <h3>No Users Found</h3>}
        </div>
    )
}
