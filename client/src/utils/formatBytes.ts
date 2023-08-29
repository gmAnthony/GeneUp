export default function formatBytes(fileSize: number) {
  if (fileSize >= 1073741824) {
    return `${(fileSize / 1073741824).toFixed(2)} GB`;
  }
  if (fileSize >= 1048576) {
    return `${(fileSize / 1048576).toFixed(2)} MB`;
  }
  if (fileSize >= 1024) {
    return `${(fileSize / 1024).toFixed(2)} KB`;
  }
  return `${fileSize} bytes`;
}
