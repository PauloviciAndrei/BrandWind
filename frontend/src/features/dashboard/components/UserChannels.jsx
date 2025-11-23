import TitleCard from '../../../components/Cards/TitleCard';

function UserChannels({ data = [] }) {
  return (
    <TitleCard title={'User Signup Source'}>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Source</th>
              <th className="normal-case">No of Users</th>
              <th className="normal-case">Conversion</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((u, k) => (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{u.signupSource}</td>
                  <td>{u.totalUsers}</td>
                  <td>{u.conversionRate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default UserChannels;
