import React, { useState } from 'react';
import { LiquidGlass, LiquidGlassProps } from 'quidlass';

/**
 * Button use case component
 */
const ButtonUseCase: React.FC<LiquidGlassProps> = (props) => {
  return (
    <div style={{ width: '100%', height: '60px' }}>
      <LiquidGlass {...props} className="button-container">
        <button
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            background: 'transparent',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Click Me
        </button>
      </LiquidGlass>
    </div>
  );
};

/**
 * Floating button use case component
 */
const FloatingButtonUseCase: React.FC<LiquidGlassProps> = (props) => {
  return (
    <div style={{ width: '100%', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '60px', height: '60px' }}>
        <LiquidGlass {...props} className="floating-button-container">
          <button
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'transparent',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1,
            }}
          >
            +
          </button>
        </LiquidGlass>
      </div>
    </div>
  );
};

/**
 * Card use case component
 */
const CardUseCase: React.FC<LiquidGlassProps> = (props) => {
  return (
    <div style={{ width: '100%', minHeight: '200px' }}>
      <LiquidGlass {...props} className="card-container">
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
            Card Title
          </h3>
          <p style={{ lineHeight: '1.6' }}>
            This is a beautiful card component with liquid glass effect. The content
            beneath is visible through the glass surface with a mesmerizing distortion.
          </p>
        </div>
      </LiquidGlass>
    </div>
  );
};

/**
 * Tooltip use case component
 */
const TooltipUseCase: React.FC<LiquidGlassProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        style={{
          padding: '0.75rem 1.5rem',
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          color: 'white',
        }}
      >
        Hover for Tooltip
      </button>
      {isVisible && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -120%)',
            width: '200px',
            zIndex: 10000,
          }}
        >
          <LiquidGlass {...props} className="tooltip-container">
            <div style={{ padding: '0.75rem 1rem' }}>
              <p style={{ fontSize: '0.875rem', margin: 0 }}>
                This is a tooltip with liquid glass effect
              </p>
            </div>
          </LiquidGlass>
        </div>
      )}
    </div>
  );
};

/**
 * Popup use case component
 */
const PopupUseCase: React.FC<LiquidGlassProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ width: '100%', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '0.75rem 1.5rem',
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          color: 'white',
        }}
      >
        Open Popup
      </button>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              width: '400px',
              maxWidth: '90vw',
              zIndex: 10001,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <LiquidGlass {...props} className="popup-container">
              <div style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
                  Popup Title
                </h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  This is a popup component with liquid glass effect. Click outside to close.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </LiquidGlass>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Modal use case component
 */
const ModalUseCase: React.FC<LiquidGlassProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ width: '100%', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '0.75rem 1.5rem',
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          color: 'white',
        }}
      >
        Open Modal
      </button>
      {isOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              zIndex: 10000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setIsOpen(false)}
          >
            <div
              style={{
                width: '500px',
                maxWidth: '90vw',
                maxHeight: '80vh',
                zIndex: 10001,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <LiquidGlass {...props} className="modal-container">
                <div style={{ padding: '2.5rem' }}>
                  <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>
                    Modal Dialog
                  </h2>
                  <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    This is a modal dialog with liquid glass effect. The glassmorphism effect
                    creates a beautiful frosted glass appearance that allows the background to
                    show through with a mesmerizing liquid distortion.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setIsOpen(false)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255, 255, 255, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </LiquidGlass>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const useCases = [
  {
    title: 'Button',
    component: ButtonUseCase,
  },
  {
    title: 'Floating Button',
    component: FloatingButtonUseCase,
  },
  {
    title: 'Card',
    component: CardUseCase,
  },
  {
    title: 'Tooltip',
    component: TooltipUseCase,
  },
  {
    title: 'Popup',
    component: PopupUseCase,
  },
  {
    title: 'Modal',
    component: ModalUseCase,
  },
];

