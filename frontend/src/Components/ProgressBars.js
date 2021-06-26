import { Progress } from "semantic-ui-react";

const ProgressBars = ({ users, username, scoreOutOf }) => {
  return (
    <div>
      {
        Object.keys(users).map((key) => {
          return (
            <div key={key} style={{ paddingTop: "1vh" }}>
              <h3 style={{ textAlign: "left", lineHeight: 0.1 }}>{users[key].username === username
                ? "You"
                : users[key].username
              }</h3>
              <Progress
                value={users[key].score}
                total={scoreOutOf}
                progress="ratio"
                color="green"
                size="medium"
              />
            </div>
          )
        })
      }
    </div>
  );
};

export default ProgressBars
