# ✅ Test Guidelines

## 🧾 Authentication

### ✅ Successful Cases

- [ ] User can register with valid email and password.
- [ ] User can register with optional fields (e.g., name, organization).
- [ ] User can log in with correct credentials.

### ❌ Failure Cases

- [ ] Registering with an email that is already in use should fail.
- [ ] Logging in with an incorrect email or password should fail.
- [ ] Registering without an email or password should fail.

---

## 👥 Collaboration

### ✅ Successful Cases

- [ ] A user can invite another **active** user to a project.
- [ ] Invited users can accept or decline invitations.
- [ ] User can be added as a collaborator with different roles on different projects.

### ❌ Failure Cases

- [ ] Inviting an **inactive** user should fail.
- [ ] Accepting a collaboration without being invited should fail.
- [ ] Assigning a role not defined in the `CollaboratorRole` enum should fail.

---

## 📁 Project Ownership and Management

### ✅ Successful Cases

- [ ] When a user creates a project, they become the `OWNER` and a `Collaborator`.
- [ ] An `OWNER` can transfer project ownership to another **active** user.
- [ ] An `OWNER` or `MANAGER` can change collaborator roles.

### ❌ Failure Cases

- [ ] Transferring ownership to an **inactive** user should fail.
- [ ] Assigning roles without sufficient permission should fail (e.g., a `MEMBER` attempting to change roles).
- [ ] Creating a project without specifying an `ownerId` should fail.

---

## 📌 Project Activity

### ✅ Successful Cases

- [ ] A project’s `OWNER` or `MANAGER` can create milestones.
- [ ] Users can create tasks linked to milestones.
- [ ] Tasks can be assigned to self or active collaborators.
- [ ] Users can comment on tasks.
- [ ] Users can update or delete entities they created (project, milestone, task, comment).

### ❌ Failure Cases

- [ ] Creating a task outside of a milestone should fail.
- [ ] Assigning a task to an inactive user should fail.
- [ ] Non-creators trying to delete or update another user's entity should fail (unless explicitly permitted).

---

## 🚫 User Inactivity Constraints

### ✅ Successful Cases

- [ ] Inactive users are automatically excluded from collaborator selection lists.
- [ ] Inactive users are prevented from being assigned new tasks.
- [ ] Ownership delegation can be validated and accepted by a new active user.

### ❌ Failure Cases

- [ ] Assigning a task or collaborator role to an inactive user should fail.
- [ ] A user cannot deactivate themselves while still owning a project without first delegating ownership or deleting the project.
- [ ] The system should prevent inactivation if the user owns projects and no eligible active users are available for ownership transfer.

---

## 📋 General System Behavior

### ✅ Successful Cases

- [ ] All timestamps (`createdAt`, `updatedAt`) are set correctly.
- [ ] Soft deletes (via `deletedAt`) mark entities as deleted without hard deletion.
- [ ] Logs are created for actions like creating, updating, or deleting entities.
