# Now if you try to build again, it'll fail with permissions issues. Why? Well, when you have WORKDIR create a directory, it does so as root which means that the node user won't have enough permissions to modify that directory. We could either use RUN to change the user or we could use RUN to make the directory in the first place as node. Let's do the latter.

# Use the official Node.js 16.15.1 image from Docker Hub as the base image
# FROM node:16.15.1-stretch
FROM node:alpine

# Switch to the 'node' user, included in the Node.js image
USER node

# Create a new directory for the application code
RUN mkdir /home/node/code

# Set the working directory to the newly created directory
WORKDIR /home/node/code

# Copy package.json and package-lock.json from the host to the Docker image
# The files are owned by the 'node' user
# This is done before copying the rest of the project files so that npm ci only run if any of these files changed
# Now if you make changes you avoid doing a full npm install. This is useful and recommended for any dependency installation: apt-get, pip, cargo, gems, etc. as well as any long-running command like building some from source.
COPY --chown=node:node package-lock.json package.json ./

# Install the project dependencies
RUN npm ci

# Copy the rest of the project files from the host to the Docker image
# The files are owned by the 'node' user
COPY --chown=node:node . .

# Expose port 3000 from the Docker container to the host machine
EXPOSE 3000

# The command to run when the Docker container starts
CMD ["node", "index.js"]