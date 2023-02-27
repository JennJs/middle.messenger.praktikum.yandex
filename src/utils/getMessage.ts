export default function getMessage(e: Event) {
    e.preventDefault();
    const data: Record<string, any> = {};
    let message: string = '';
    const inputMessage = document.getElementById('message_textarea') as HTMLInputElement;

    if (inputMessage.value.trim().length === 0) {
      return;
    } else {
      data[inputMessage.name] = inputMessage.value;
      message = data.message;
      inputMessage.value = '';
    }
    return message;
  }
