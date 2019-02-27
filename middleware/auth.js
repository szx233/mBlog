export default function ({store,redirect}) {
  if (!store.state.adminToken) {
    redirect('/login')
  }
}