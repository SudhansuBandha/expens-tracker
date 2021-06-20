import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const modal = {
  hidden: {
    x: "100vw",
    y: "80vh",
    opacity: 0,
    transition: { type: "tween", duration: 1 },
  },
  visible: {
    y: "80vh",
    x: "35vw",
    opacity: 1,
    transition: { type: "tween", duration: 1 },
  },
};
function Message({ open, onClose }) {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 2000);
  }, [open]);

  return (
    <Container>
      {" "}
      <AnimatePresence>
        {open && (
          <motion.div className="backdrop">
            <motion.div
              className="modal"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modal}
            >
              <p>transaction added successfully</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.div`
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  .modal {
    max-width: 26vw;
    margin: 0 auto;
    padding: 20px 10px 10px 10px;
    background: var(--clr-green-3);
    border-radius: 10px;
    text-align: center;
    @media screen and (max-width: 800px) {
      max-width: 50vw;
      padding: 5px 10px;
    }
    p {
      color: var(--clr-white);
      text-transform: capitalize;
      font-size: 20px;
    }
  }
`;
export default Message;
