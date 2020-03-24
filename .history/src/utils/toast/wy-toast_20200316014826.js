export default {
  // toast
  Toast: function(obj, message, variant, title, content) {
    const h = obj.$createElement;

    const vNodesMsg = h("p", { class: ["text-center", "mb-0"] }, [
      h("b-spinner", { props: { type: "grow", small: true } }),
      h("strong", {}, content),
      `#${message}`,
      h("b-spinner", { props: { type: "grow", small: true } })
    ]);

    const vNodesTitle = h(
      "div",
      { class: ["d-flex", "flex-grow-1", "align-items-baseline", "mr-2"] },
      [
        h("strong", { class: "mr-2" }, title),
        h("small", { class: "ml-auto text-italics" }, "刚刚")
      ]
    );

    obj.$bvToast.toast([vNodesMsg], {
      title: [vNodesTitle],
      solid: true,
      variant: variant,
      toaster: "b-toaster-top-center"
    });
  }
};
