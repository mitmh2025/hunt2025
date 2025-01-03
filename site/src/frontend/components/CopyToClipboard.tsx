import React, { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { deviceMax } from "../utils/breakpoints";

export const NO_COPY_CLASS = "no-copy";
export const COPY_ONLY_CLASS = "copy-only";

export const CopyToClipboardContainer = styled.div`
  position: sticky;
  bottom: 2rem;
  left: 0;
  margin-left: -64px;
  user-select: none;

  @media print {
    display: none;
  }

  @media ${deviceMax.md} {
    &&& {
      margin-left: -32px;
    }
  }

  p {
    display: none;
    position: absolute;
    top: -7rem;
    width: 15rem;
    background-color: rgb(from var(--gray-900) r g b / 90%);
    color: var(--white);
    padding: 0.5rem;
    border-radius: 0.25rem;

    &:has(+ button:hover) {
      display: block;
    }
  }

  button {
    border: none;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    font-size: 64px;
    &:hover {
      filter: brightness(1.2);
    }
  }
`;

export const CLIPBOARD_MONOSPACE_FONT_FAMILY =
  '"Roboto Mono", "Cascadia Mono", monospace';

const StylesToPreserve: string[] = [
  "background-color",
  "color",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "vertical-align",
  "text-align",
];

const ResetStyles = {
  "background-color": "transparent",
  color: "inherit",
  "font-family": "inherit",
  "font-size": "inherit",
  "font-weight": "inherit",
  "font-style": "inherit",
  "text-decoration": "none",
  "vertical-align": "baseline",
  "text-align": "left",
};

const cloneForCopy = (root: HTMLElement): HTMLElement => {
  const rootStyles =
    root instanceof HTMLElement
      ? window.getComputedStyle(root)
      : new CSSStyleDeclaration();

  const pushDownStyles = (node: HTMLElement, styles: CSSStyleDeclaration) => {
    StylesToPreserve.forEach((style) => {
      if (
        styles.getPropertyValue(style) !== rootStyles.getPropertyValue(style)
      ) {
        node.style.setProperty(style, styles.getPropertyValue(style));
      }
    });

    const backgroundColor = styles.getPropertyValue("background-color");
    if (
      backgroundColor.startsWith("rgba(") &&
      backgroundColor.endsWith(", 0)")
    ) {
      node.style.removeProperty("background-color");
    }

    // Copy borders
    ["top", "right", "bottom", "left"].forEach((side) => {
      let width = styles.getPropertyValue(`border-${side}-width`);
      const widthParsed = parseFloat(width);
      if (widthParsed === 0) {
        return;
      }
      // Sheets seems to prefer border widths to be the exact widths of
      // its predetermined border thicknesses, and will clamp _everything_,
      // not just widths between thicknesses, to whatever predetermined
      // thickness is the closest to the largest border width in the pasted
      // content.
      if (widthParsed < 1 && width.endsWith("px")) {
        width = "1px";
      } else if (widthParsed > 1 && width.endsWith("px")) {
        width = "3px";
      }

      const style = styles.getPropertyValue(`border-${side}-style`);
      const color = styles.getPropertyValue(`border-${side}-color`);
      node.style.setProperty(`border-${side}-width`, width);
      node.style.setProperty(`border-${side}-style`, style);
      node.style.setProperty(`border-${side}-color`, color);
    });

    if (node.style.fontFamily.includes("monospace")) {
      node.style.fontFamily = CLIPBOARD_MONOSPACE_FONT_FAMILY;
    }
  };

  const include = (node: Node) => {
    if (
      node instanceof HTMLScriptElement ||
      node instanceof HTMLStyleElement ||
      node instanceof HTMLLinkElement
    ) {
      return false;
    }

    if (!(node instanceof Element)) {
      return true;
    }

    if (!node.checkVisibility()) {
      return false;
    }

    return true;
  };

  const transform = (node: Node) => {
    if (!(node instanceof Element)) {
      return node;
    }

    let transformed = node;
    transformed.normalize();

    if (
      transformed instanceof HTMLElement &&
      transformed.childNodes.length === 1 &&
      transformed.firstChild instanceof Text &&
      transformed.firstChild.textContent?.match(/^\([0-9]+\)$/)
    ) {
      // Adjust the presentation of this text node so that Sheets doesn't think it's a negative number
      transformed.dataset.sheetsValue = JSON.stringify({
        "1": 2,
        "2": transformed.textContent,
      });
    }

    if (transformed instanceof HTMLOListElement) {
      // Rewrite <ol> to tables to preserve numbering
      const table = document.createElement("table");
      const tbody = document.createElement("tbody");
      table.appendChild(tbody);

      let lastIndex = 0;
      transformed.childNodes.forEach((child) => {
        if (!(child instanceof HTMLLIElement)) {
          return;
        }

        if (child.tagName.toLowerCase() !== "li") {
          return;
        }

        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        const index = child.value !== 0 ? child.value : lastIndex + 1;

        const tdIndex = document.createElement("td");
        tdIndex.textContent = index.toString();
        tr.appendChild(tdIndex);

        const tdContent = document.createElement("td");
        [...child.attributes].forEach((attr) => {
          attr.nodeValue &&
            tdContent.setAttribute(attr.nodeName, attr.nodeValue);
        });
        tdContent.innerHTML = child.innerHTML;
        tr.appendChild(tdContent);

        lastIndex = index;
      });

      transformed = table;
    }

    if (
      transformed instanceof HTMLElement &&
      transformed.tagName.toLowerCase() === "summary"
    ) {
      // Add the disclosure triangle as text
      transformed.insertBefore(
        document.createTextNode("▼ "),
        transformed.firstChild,
      );
    }

    if (transformed instanceof HTMLAudioElement) {
      // Replace audio elements with a link to the source
      const link = document.createElement("a");
      link.href = transformed.src;
      link.textContent = "[Audio link]";
      transformed = link;
    }

    if (transformed instanceof HTMLAnchorElement && transformed.href) {
      // Add domain to relative links
      const url = new URL(transformed.href, document.location.href);
      transformed.href = url.toString();
    }

    if (transformed instanceof HTMLImageElement) {
      // Add domain to relative image URLs
      const url = new URL(transformed.src, document.location.href);
      transformed.src = url.toString();
    }

    [...transformed.childNodes].forEach((child) => {
      if (child instanceof HTMLTableElement || child instanceof HTMLHRElement) {
        transformed.insertBefore(
          document.createElement("br"),
          child.nextSibling,
        );
      }

      if (
        child instanceof HTMLDivElement ||
        child instanceof HTMLParagraphElement
      ) {
        transformed.insertBefore(
          document.createTextNode("\n"),
          child.nextSibling,
        );
      }
    });

    return transformed;
  };

  const renderImageLink = (node: HTMLImageElement) => {
    const link = document.createElement("a");
    link.href = node.src;
    link.textContent = node.alt
      ? `[Image: ${node.alt}]`
      : "[See original puzzle for image]";
    return link;
  };

  const fixImagesAndLinks = (node: Node) => {
    if (!(node instanceof Element)) {
      return;
    }

    // There is exactly one case in which we can inline an image into Google
    // Sheets, and that is if it is the only descendent of a table cell
    // (optionally with a link wrapper)
    //
    // (We leave the non-dataset content as a link to the image for the benefit
    // of anything that doesn't parse data-sheets-formula, like Excel)
    //
    // We'll also try to massage images into this format if they are at the
    // top-level of the markup

    const transformableTopLevelImages = node.querySelectorAll(
      ":scope > img, :scope > a:has(> img:only-child)",
    );
    transformableTopLevelImages.forEach((img) => {
      // Wrap in a div so it gets picked up by the next selector
      const div = document.createElement("div");
      img.replaceWith(div);
      div.appendChild(img);
    });

    const transformableContainers = node.querySelectorAll(
      ":scope > div:has(> img:only-child), :scope > div:has(> a:only-child > img:only-child)",
    );
    transformableContainers.forEach((container) => {
      const table = document.createElement("table");
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      table.appendChild(tr);
      tr.appendChild(td);
      td.replaceChildren(...container.childNodes);
      container.replaceWith(table);
    });

    const transformableImages = node.querySelectorAll(
      "td:has(> img:only-child)",
    );
    transformableImages.forEach((td) => {
      if (!(td instanceof HTMLElement)) {
        return;
      }

      if (td.dataset.sheetsFormula) {
        return;
      }

      const img = td.firstElementChild;
      if (!(img instanceof HTMLImageElement)) {
        return;
      }

      td.dataset.sheetsFormula = `=image("${img.src}")`;
      td.replaceChildren(renderImageLink(img));
    });

    const transformableImageLinks = node.querySelectorAll(
      "td:has(> a:only-child > img:only-child)",
    );
    transformableImageLinks.forEach((td) => {
      if (!(td instanceof HTMLElement)) {
        return;
      }

      if (td.dataset.sheetsFormula) {
        return;
      }

      const a = td.firstElementChild;
      if (!(a instanceof HTMLAnchorElement)) {
        return;
      }

      const img = a.firstElementChild;
      if (!(img instanceof HTMLImageElement)) {
        return;
      }

      td.dataset.sheetsFormula = `=hyperlink("${a.href}", image("${img.src}"))`;
      td.replaceChildren(renderImageLink(img));
    });

    const transformableLinks = node.querySelectorAll("td:has(> a:only-child)");
    transformableLinks.forEach((td) => {
      if (!(td instanceof HTMLElement)) {
        return;
      }

      if (td.dataset.sheetsFormula) {
        return;
      }

      const a = td.firstElementChild;
      if (!(a instanceof HTMLAnchorElement)) {
        return;
      }

      td.dataset.sheetsFormula = `=hyperlink("${a.href}", "${a.textContent}")`;
      td.replaceChildren(a);
    });

    // Finally, if there are any images left, we can't embed them so render as links instead
    const remainingImages = node.querySelectorAll("img");
    remainingImages.forEach((img) => {
      img.replaceWith(renderImageLink(img));
    });
  };

  const styleResetSpan = document.createElement("span");
  Object.entries(ResetStyles).forEach(([property, style]) => {
    styleResetSpan.style.setProperty(property, style);
  });

  const addStyleResets = (node: Node) => {
    if (!(node instanceof HTMLElement)) {
      return;
    }

    [...node.childNodes].forEach((child) => {
      addStyleResets(child satisfies Node);

      if (!(child instanceof HTMLElement)) {
        return;
      }

      if (child instanceof HTMLTableCellElement) {
        return;
      }

      if (child.hasAttribute("style")) {
        node.insertBefore(styleResetSpan.cloneNode(), child.nextSibling);
      }
    });
  };

  const recursiveClone = (node: Node): Node => {
    const result =
      node === root
        ? document.createElement("google-sheets-html-origin")
        : node.cloneNode();
    if (node instanceof HTMLElement && result instanceof HTMLElement) {
      result.removeAttribute("style");
      pushDownStyles(result, window.getComputedStyle(node));
    }

    node.childNodes.forEach((child) => {
      if (!include(child)) {
        return;
      }

      result.appendChild(recursiveClone(child));
    });

    return transform(result);
  };

  // details tags suppress visibility of their contents in a way that can't be
  // overridden by CSS, so the only way to see them is to temporarily open them
  // on the source DOM tree
  root.querySelectorAll("details").forEach((details) => {
    details.dataset.copyOriginalOpen = details.open.toString();
    details.open = true;
  });

  const cloned = recursiveClone(root) as HTMLElement;

  // close the details tags again
  root.querySelectorAll("details").forEach((details) => {
    details.open = details.dataset.copyOriginalOpen === "true";
    delete details.dataset.copyOriginalOpen;
  });

  fixImagesAndLinks(cloned);
  addStyleResets(cloned);

  return cloned;
};

const LEADING_WHITESPACE_REGEX = /^[^\S\r\n]+/gm;
const MANY_LF_REGEX = /\n{3,}/g;
const MANY_CRLF_REGEX = /(\r\n){3,}/g;
const trimPlainText = (rawPlainText: string) => {
  let result = rawPlainText.trim();
  result = result.replaceAll(LEADING_WHITESPACE_REGEX, "");
  result = result.replaceAll(MANY_LF_REGEX, "\n\n");
  result = result.replaceAll(MANY_CRLF_REGEX, "\r\n\r\n");
  return result;
};

const CopyToClipboard = () => {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const copiedMessageTimer = useRef<number | undefined>();

  useEffect(() => {
    return () => {
      const timer = copiedMessageTimer.current;
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  const onCopy = useCallback((e: ClipboardEvent) => {
    const content = document.getElementById("puzzle-content");
    if (!content) {
      // weird
      return;
    }

    if (!content.dataset.interceptNextCopy) {
      return;
    }
    delete content.dataset.interceptNextCopy;

    content.classList.add("copying");
    try {
      const cloned = cloneForCopy(content);

      // innerText on detached nodes does not insert whitespace for block
      // element breaks so we need to temporarily attach it to the document
      document.body.appendChild(cloned);
      const text = cloned.innerText;
      document.body.removeChild(cloned);

      e.preventDefault();
      e.clipboardData?.setData("text/plain", trimPlainText(text));
      e.clipboardData?.setData("text/html", cloned.outerHTML);
    } finally {
      content.classList.remove("copying");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("copy", onCopy);
    return () => {
      document.removeEventListener("copy", onCopy);
    };
  }, [onCopy]);

  const onClick = useCallback(() => {
    const selection = window.getSelection();
    if (!selection) {
      return;
    }

    const content = document.getElementById("puzzle-content");
    if (!content) {
      // weird
      return;
    }

    selection.removeAllRanges();
    const range = document.createRange();
    range.selectNode(content);
    selection.addRange(range);

    content.dataset.interceptNextCopy = "true";
    document.execCommand("copy");
    delete content.dataset.interceptNextCopy;

    selection.removeAllRanges();

    if (copiedMessageTimer.current) {
      window.clearTimeout(copiedMessageTimer.current);
    }
    setShowCopiedMessage(true);
    copiedMessageTimer.current = window.setTimeout(() => {
      setShowCopiedMessage(false);
    }, 3000);
  }, []);

  return (
    <CopyToClipboardContainer id="copy-to-clipboard" className={NO_COPY_CLASS}>
      <p>
        {showCopiedMessage
          ? "Copied!"
          : "Click to copy puzzle content for ease of pasting into Google Sheets or Excel."}
      </p>
      <button onClick={onClick}>📋</button>
    </CopyToClipboardContainer>
  );
};

export default CopyToClipboard;
