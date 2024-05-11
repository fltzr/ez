import styles from './styles.module.scss';

type TableRowProps = {
  offset: number;
  separator?: boolean;
  compact?: boolean;
  isHeader?: boolean;
};

export const TableRow = ({
  offset,
  separator = true,
  compact = false,
  isHeader = false,
}: TableRowProps) => {
  const offsetTop = 0.4482;
  const offsetBottom = 3.4482;
  const separatorDistance = compact ? 7 : 8;

  return (
    <g
      transform={`translate(0, ${offset.toString()})`}
      className={isHeader ? styles['column-header'] : styles.disabled}
    >
      <path
        d={`M53 ${offsetTop.toString()}H56V${offsetBottom.toString()}H53V${offsetTop.toString()}Z`}
      />
      <path
        d={`M61 ${offsetTop.toString()}H85V${offsetBottom.toString()}H61V${offsetTop.toString()}Z`}
        className={isHeader ? undefined : styles.primary}
      />
      <path
        d={`M138 ${offsetTop.toString()}H118V${offsetBottom.toString()}H138V${offsetTop.toString()}Z`}
      />
      <path
        d={`M185 ${offsetTop.toString()}H141V${offsetBottom.toString()}H185V${offsetTop.toString()}Z`}
      />
      {separator && (
        <path
          d={`M48 ${separatorDistance.toString()}H187.387`}
          className={styles.separator}
          strokeLinecap='square'
        />
      )}
    </g>
  );
};

type TableRowsProps = {
  offsetTop: number;
  rows: number;
  compact?: boolean;
};

export const TableRows = ({ offsetTop, rows, compact = false }: TableRowsProps) => {
  const distance = compact ? 10 : 13;

  return (
    <g>
      {[...Array(rows)].map((_, index) => {
        const offset = offsetTop + index * distance;
        const key = `row-${index.toString()}-${offset.toString()}`;

        return (
          <TableRow
            key={key}
            offset={offsetTop + index * distance}
            compact={compact}
            separator={index + 1 !== rows}
          />
        );
      })}
    </g>
  );
};

export const WindowPath = () => (
  <path
    d='M24 1.00006H211C211.552 1.00006 212 1.44778 212 2.00006V105C212 105.552 211.552 106 211 106H24C23.4477 106 23 105.552 23 105V2.00006C23 1.44778 23.4477 1.00006 24 1.00006Z'
    className={styles.window}
    strokeWidth='2'
  />
);
export const TopNavigation = () => (
  <g className='awsui-context-top-navigation'>
    <rect x='24' y='2' width='187' height='6' className={styles['top-navigation']} />
  </g>
);
