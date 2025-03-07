export default function UneditablePrompt({ text }: { text: string }) {
  return <pre className="p-2 pb-4 rounded-md bg-gray-300 solid-black oveflow-ellipses">{text}</pre>
}