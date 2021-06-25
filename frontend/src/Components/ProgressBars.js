import { Progress } from "semantic-ui-react";

const ProgressBars = ({ users, username, scoreOutOf }) => {
  return (
    <div>
      {
        Object.keys(users).map((key) => {
          return (
            <Progress
              label={users[key].username === username
                ? "You"
                : users[key].username
              }
              value={users[key].score}
              total={scoreOutOf}
              progress="ratio"
              color="green"
              size="medium"
            />
          )
        })
      }
    </div>
  );
};

export default ProgressBars
