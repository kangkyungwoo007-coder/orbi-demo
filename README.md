# orbi-demo

[Orbi](https://orbi.build/?ref=gh-orbi-demo) is an AI coding agent that works from GitHub issues. You label an issue `ai-ready`; Orbi writes the change, has a second AI session review it, and merges the pull request itself. This repository is a tiny todo app to try it on. Make your own copy and let Orbi change anything in it, so your real projects stay untouched.

Open `index.html` in a browser to use the app. The list logic lives in `src/todo.js` and is tested in `test/`. CI runs the tests on every pull request, and Orbi only merges once they pass.

## See finished deliveries first

A delivery is one issue taken to a merged pull request. Orbi is developed with Orbi, and these two bugs from its own repository were each delivered that way and then shipped in v0.5.57. Each page links to the issue, the pull request and the commit, and shows the agent's run time, model requests and tokens.

- [Merge fails on repositories that disallow merge commits](https://orbi.build/proof/orbi-build/orbi/1480?ref=gh-orbi-demo)
- [Delivery branches stay on the remote after merge](https://orbi.build/proof/orbi-build/orbi/1478?ref=gh-orbi-demo)

## Try it on your own copy

This uses Orbi Cloud, the hosted version. Your first 3 merged deliveries are free in total, model usage included, with no credit card; a delivery that fails doesn't count. Paid plans are on the [pricing page](https://orbi.build/cloud/?ref=gh-orbi-demo).

1. Click **Use this template** to make your own copy of this repository.
2. Open the [Orbi Cloud dashboard](https://orbi.build/api/?ref=gh-orbi-demo) and sign in with GitHub. Install the Orbi GitHub App on your copy only, then pick your copy on the **Connect repository** page.
3. After connecting you land on the status page. Wait for it to finish preparing the environment Orbi works in. It takes one to two minutes and also adds the `ai-ready` label to your copy.
4. Open an issue that asks for one small change. A title and a sentence or two are enough, for example:

   > **Show how many todos are left**
   >
   > Under the list, show "N items left", counting only todos that are not done. Update it whenever a todo is added, completed or removed.

   Other ideas: a "Clear completed" button, keeping the list after a page reload, editing a todo's title by double-clicking it.
5. Add the `ai-ready` label. Orbi checks for labelled issues every few minutes and comments on the issue as it works.

Orbi writes the change on a branch and opens a pull request. The review session checks it against the issue, fixes what it can, and approves the final version, its own fixes included. If nobody has pushed to the pull request since that approval and CI passes, Orbi merges it without waiting for you. If you want to approve every merge yourself, turn on branch protection with a required review; Orbi then labels the issue `ai-awaiting-merge` and waits for you. If Orbi can't finish, it labels the issue `ai-blocked` and explains why in a comment. To see the change, read the merged pull request on GitHub, or clone your copy and open `index.html`.

## Optional: cut a release

Releases never happen on their own. On the status page, open **Settings and reference**, and create a version under **Versions**, such as `v0.2.0`. That makes a GitHub milestone with the same name; put issues in the version by adding them to that milestone. Click **Release** when they are done. Orbi then opens a release issue, bumps the version, tags it and publishes the GitHub Release. Details are in the [Orbi Cloud quickstart](https://cloud-docs.orbi.build/quickstart) and [releases guide](https://cloud-docs.orbi.build/releases).

## Run the tests

```
npm test
```

Requires Node.js 20 or later. No dependencies.

## License

MIT
