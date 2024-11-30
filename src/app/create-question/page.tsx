import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

export default function CreateQuestionPage() {
  return (
    <div>
      <div>
        <h2>Question Title</h2>
        <Input placeholder="Question Title" />
      </div>

      <div>
        <h2>Question Description</h2>
        <Textarea placeholder="Type question description here" />
      </div>

      <div>
        <h2>Tags</h2>
        <Input placeholder="Tags" />
      </div>

      <Button>Create</Button>
    </div>
  );
}
